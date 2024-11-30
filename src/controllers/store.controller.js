import {pool} from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//configuramos el token
const secret_key="abc123";

export const getCategoria = async(req, res) => {
  const result=await pool.query("SELECT * FROM tb_categoria")
  res.json(result[0]);
};
export const getproducto = async(req, res) => {
  const result=await pool.query("SELECT * FROM tb_producto")
  res.json(result[0]);
};
export const postCrearUsuario = async (req, res) => {
  const { nombre, apellido, username, clave, direccion, telefono, tipo } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await pool.query('SELECT * FROM tb_cliente WHERE username = ?', [username]);

    if (existingUser[0].length > 0) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Hash de la contraseña antes de guardarla en la base de datos (usando bcrypt)
    const hashedPassword = await bcrypt.hash(clave, 10);

    // Insertar nuevo usuario
    const result = await pool.query('INSERT INTO tb_cliente (nombre, apellido, username, clave, direccion, telefono, tipo) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nombre, apellido, username, hashedPassword, direccion, telefono, tipo]);

    // Enviar respuesta de éxito
    res.status(201).json({ message: 'Usuario registrado correctamente', newUser: result.insertId });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
};
export const postLogin = async (req, res) => {
  const { username, clave } = req.body;

  try {
    // Buscar al usuario por su nombre de usuario
    const [rows] = await pool.query('SELECT * FROM tb_cliente WHERE username = ?', [username]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const user = rows[0];

    // Verificar la contraseña utilizando bcrypt
    const isMatch = await bcrypt.compare(clave, user.clave);

    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Generar un token JWT
    const token = jwt.sign({ id_cliente: user.id_cliente, username: user.username,tipo:user.tipo }, secret_key, {
      expiresIn: '1h' // El token expira en 1 hora, ajusta según tus necesidades
    });

    // Enviar respuesta de éxito con el token JWT
    res.json({ token,tipo:user.tipo });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

export const postCrearProducto = async (req, res) => {
  const { nombre, detalle, costo, imagen, estado, stock, categoria } = req.body;

  try {
    // Insertar nuevo producto
    const result = await pool.query('INSERT INTO tb_producto (nombre, detalle, costo, imagen, estado, stock, categoria) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nombre, detalle, costo, imagen, estado, stock, categoria]);

    // Enviar respuesta de éxito
    res.status(201).json({ message: 'Producto creado correctamente', newProduct: result.insertId });
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ message: 'Error al crear producto' });
  }
};
//Crearemos una función para eliminar un producto
export const deleteProducto = async (req, res) => {
  const { id } = req.params;

  try {
    // Eliminar producto por ID
    const result = await pool.query('DELETE FROM tb_producto WHERE id_producto = ?', [id]);

    // Verificar si se eliminó algún producto
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Enviar respuesta de éxito
    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ message: 'Error al eliminar producto' });
  }
};

//Creamos la funcion para actualizar un producto
export const updateProducto = async (req, res) => {
  const id_producto = req.params.id;
  const { nombre, detalle, costo, imagen, estado, stock, categoria } = req.body;

  try {
    // Verificar si el producto existe
    const [rows] = await pool.query('SELECT * FROM tb_producto WHERE id_producto = ?', [id_producto]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Actualizar producto
    const result = await pool.query('UPDATE tb_producto SET nombre = ?, detalle = ?, costo = ?, imagen = ?, estado = ?, stock = ?, categoria = ? WHERE id_producto = ?',
      [nombre, detalle, costo, imagen, estado, stock, categoria, id_producto]);

    // Verificar si se actualizó algún producto
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Producto no encontrado o datos no modificados' });
    }

    // Enviar respuesta de éxito
    res.status(200).json({ message: 'Producto actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ message: 'Error al actualizar producto' });
  }
};

//Creamos la función para crear un nuevo pedido
export const createPedido = async (req, res) => {
  const { tb_cliente_id_cliente, tb_producto_id_producto } = req.body;

  // Verificar si tb_cliente_id_cliente no es null y existe en la tabla tb_cliente
  if (!tb_cliente_id_cliente) {
    return res.status(400).json({ message: 'El ID del cliente es requerido' });
  }

  try {
    // Verificar si el cliente existe en la base de datos
    const existingCliente = await pool.query('SELECT * FROM tb_cliente WHERE id_cliente = ?', [tb_cliente_id_cliente]);
    if (existingCliente.length === 0) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    // Crear una nueva instancia de Date para obtener la fecha actual
    const fecha = new Date().toISOString().slice(0, 19).replace('T', ' '); // Formato YYYY-MM-DD HH:mm:ss

    // Insertar nuevo pedido
    const result = await pool.query(
      'INSERT INTO tb_pedido (tb_cliente_id_cliente, tb_producto_id_producto, fecha) VALUES (?, ?, ?)',
      [tb_cliente_id_cliente, tb_producto_id_producto, fecha]
    );

    // Enviar respuesta de éxito
    res.status(201).json({ message: 'Pedido creado correctamente', newPedido: result.insertId });
  } catch (error) {
    console.error('Error al crear pedido:', error);
    res.status(500).json({ message: 'Error al crear pedido' });
  }
};



//creamos una funcion para obtener todos los pedidos
export const getPedidosCliente = async (req, res) => {
  const id_cliente = req.params.id_cliente; // Obtener el ID del cliente desde los parámetros o el token

  try {
    const result = await pool.query(
      'SELECT * FROM tb_pedido WHERE tb_cliente_id_cliente = ?', [parseInt(id_cliente, 10)]
    );

    res.json(result[0]);
  } catch (error) {
    console.error('Error al obtener pedidos del cliente:', error);
    res.status(500).json({ message: 'Error al obtener pedidos del cliente' });
  }
};




