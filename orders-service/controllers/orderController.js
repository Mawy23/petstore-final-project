const Order = require('../models/Order');
const axios = require('axios');


const createOrder = async (req, res) => {
    try {
        const { shippingAddress, paymentMethod } = req.body;
        const userId = req.userId;

        // Obtener los items del Carrito
        const cartResponse = await axios.get(`http://cart-service:3005/api/cart`, {
            headers: { Authorization: req.headers.authorization }
        });

        // Verifica si cart.items está presente y tiene elementos
        const cart = cartResponse.data;
        if (!cart || !cart.cart || cart.cart.length === 0) {
            return res.status(400).json({ message: 'El carrito está vacío o no se pudo obtener los items' });
        }

        // Mapea los items para tener el formato esperado por el servicio de pedidos
        const items = cart.cart.map(item => ({
            productId: item.product._id,  // Asumiendo que cada item tiene un objeto 'product'
            quantity: item.quantity
        }));

        // Actualizar el inventario en el servicio de Productos
        for (const item of items) {
            await axios.put(`http://products-service:3004/api/products/${item.productId}/update-stock`, {
                quantity: -item.quantity
            });
        }

        // Crear el pedido
        const order = new Order({
            userId,
            shippingAddress,
            paymentMethod,
            items
        });

        // Guardar el pedido en la base de datos
        await order.save();

        // Limpiar el carrito
        await axios.delete(`http://cart-service:3005/api/cart/clear`, {
            headers: { Authorization: req.headers.authorization }
        });

        // Responder con éxito
        res.status(201).json({
            message: 'Pedido realizado con éxito',
            order
        });
    } catch (err) {
        console.error(err);  // Log del error para depuración
        res.status(500).json({
            message: 'Error al crear el pedido',
            error: err.message
        });
    }
};



// Función para obtener las órdenes de un usuario
const getOrdersByUser = async (req, res) => {
    const userId = req.params.userId; // Obtenemos el userId de la URL

    try {
        const orders = await Order.find({ userId });  // Asumiendo que 'userId' es un campo en el modelo 'Order'
        res.json(orders);  // Devuelve las órdenes del usuario
    } catch (error) {
        console.error('Error al obtener las órdenes:', error.message);
        res.status(500).json({ message: 'Error al obtener las órdenes', error: error.message });
    }
};

module.exports = { createOrder, getOrdersByUser };
