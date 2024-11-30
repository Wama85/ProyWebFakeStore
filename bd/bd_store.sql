-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: bd_store
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tb_categoria`
--
use bd_store;

DROP TABLE IF EXISTS `tb_categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_categoria` (
  `id_categoria` int NOT NULL AUTO_INCREMENT,
  `detalle` varchar(50) NOT NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_categoria`
--

LOCK TABLES `tb_categoria` WRITE;
/*!40000 ALTER TABLE `tb_categoria` DISABLE KEYS */;
INSERT INTO `tb_categoria` VALUES (1,'Joyas'),(2,'Ropa de Hombre'),(3,'Electronicos'),(4,'Ropa de Mujer');
/*!40000 ALTER TABLE `tb_categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_cliente`
--

DROP TABLE IF EXISTS `tb_cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_cliente` (
  `id_cliente` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) DEFAULT NULL,
  `carnet` int DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `clave` varchar(128) NOT NULL,
  `direccion` varchar(200) DEFAULT NULL,
  `telefono` int DEFAULT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_cliente`
--

LOCK TABLES `tb_cliente` WRITE;
/*!40000 ALTER TABLE `tb_cliente` DISABLE KEYS */;
INSERT INTO `tb_cliente` VALUES (2,'Wilner','Mena Aguilar',NULL,'wama','$2b$10$fXrvnPMoOfKAr/HOAf1eMePMW5HvWDAhVxK0mcioqYcflTwlZJily','Av. Final Siglo XX, Nro113',NULL,'root'),(3,'Martin','Condori Buenavista',NULL,'martin','$2b$10$p3KJoSUhI.eBuW7hOSodBeIVkJ6rE91fD1uhsADUlqyz30iDZ75u6','no tiene',NULL,'estandar'),(4,'Juan','Apaza Mercado',NULL,'juan','$2b$10$Wx4hyoB3WoysgejuuGHB6umw2NgqbpzArDH6d7leVGUKJy.Nhwts.','0',NULL,'estandar'),(5,'Richard','Martinez',NULL,'richard','$2b$10$5vwBWOtX7HhN0Ih50oYOCeM4X7xURWckDeIj4PTmbqXdHInKUgHQu','0',NULL,'estandar'),(6,'Pedro','Mendez',NULL,'pedro','$2b$10$U3WLUCNepDt.szneWRBVFuDB/JM74IpAsABo0gkbXcvBNCQNNoGFa','0',NULL,'estandar'),(7,'Adriel','Tapia',NULL,'adriel','$2b$10$ayqOpfpA0R3TWUMxUzONheQbPS9k5.izU317o3LUgr.Ti/aaMfjQW','0',NULL,'estandar'),(8,'Sebastian','Beller',NULL,'sebas','$2b$10$8VQH4kRVfpE6ZxRVzJCnb.qoaAdu/0JhHwCoveXXIBfWrDv.eaSmu','0',NULL,'estandar');
/*!40000 ALTER TABLE `tb_cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_pedido`
--

DROP TABLE IF EXISTS `tb_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_pedido` (
  `id_pedido` int NOT NULL AUTO_INCREMENT,
  `tb_cliente_id_cliente` int NOT NULL,
  `tb_producto_id_producto` int NOT NULL,
  `fecha` date NOT NULL,
  PRIMARY KEY (`id_pedido`,`tb_cliente_id_cliente`,`tb_producto_id_producto`),
  KEY `fk_tb_cliente_has_tb_producto_tb_producto1_idx` (`tb_producto_id_producto`),
  KEY `fk_tb_cliente_has_tb_producto_tb_cliente1_idx` (`tb_cliente_id_cliente`),
  CONSTRAINT `fk_tb_cliente_has_tb_producto_tb_cliente1` FOREIGN KEY (`tb_cliente_id_cliente`) REFERENCES `tb_cliente` (`id_cliente`),
  CONSTRAINT `fk_tb_cliente_has_tb_producto_tb_producto1` FOREIGN KEY (`tb_producto_id_producto`) REFERENCES `tb_producto` (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_pedido`
--

LOCK TABLES `tb_pedido` WRITE;
/*!40000 ALTER TABLE `tb_pedido` DISABLE KEYS */;
INSERT INTO `tb_pedido` VALUES (3,2,1,'2024-06-16'),(25,2,1,'2024-06-18'),(26,2,1,'2024-06-18'),(27,2,5,'2024-06-18'),(28,2,3,'2024-06-18'),(29,2,1,'2024-06-18');
/*!40000 ALTER TABLE `tb_pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_producto`
--

DROP TABLE IF EXISTS `tb_producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_producto` (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(250) NOT NULL,
  `detalle` longtext NOT NULL,
  `costo` float NOT NULL,
  `imagen` varchar(150) NOT NULL,
  `estado` varchar(10) DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `categoria` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_producto`
--

LOCK TABLES `tb_producto` WRITE;
/*!40000 ALTER TABLE `tb_producto` DISABLE KEYS */;
INSERT INTO `tb_producto` VALUES (1,'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptop','Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',100,'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg','true',8,'Ropa de Hombre'),(2,'Mens Casual Premium Slim Fit T-Shirts','Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',22,'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg','true',8,'Ropa de Hombre'),(3,'John Hardy Women\'s Legends Naga Gold & Silver Dragon Station Chain Bracelet','From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean\'s pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.',695,'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg','true',5,'Joyas'),(4,'WD 2TB Elements Portable External Hard Drive - USB 3.0','USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system',64,'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg','true',5,'Electronicos'),(5,'BIYLACLESEN Women\'s 3-in-1 Snowboard Jacket Winter Coats','Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates',57,'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg','true',10,'Ropa de Mujer'),(7,'White Gold Plated Princess','Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine\'s Day',10.5,'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg','1',10,'Joyas'),(8,'Pierced Owl Rose Gold Plated Stainless Steel Double','Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel',10.99,'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg','1',5,'Joyas'),(10,'SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s','Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)',109,'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg','1',5,'Electronicos'),(15,'Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5','3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.',109,'https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg','1',10,'Electronicos'),(16,'WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive','Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer\'s limited warranty',114,'https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg','1',2,'Electronicos');
/*!40000 ALTER TABLE `tb_producto` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-17 23:15:06
