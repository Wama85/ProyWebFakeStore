import{Router} from 'express';
import {postCrearUsuario,
  postLogin,
   getCategoria,
   createPedido,
   getproducto,
   postCrearProducto,
   deleteProducto,
   updateProducto,
   getPedidosCliente
  } from '../controllers/store.controller.js'
const router=Router();

router.get('/categoria',getCategoria);
router.get('/producto',getproducto);
router.post('/producto',postCrearProducto);
router.get('/pedidos/:id_cliente',getPedidosCliente);
router.post('/login',postLogin);
router.post('/crearUsuario',postCrearUsuario);
router.delete('/producto/:id', deleteProducto);
router.put('/producto/:id', updateProducto);
router.post('/crearPedido', createPedido);
export default router
