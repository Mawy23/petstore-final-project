const Order = require('../models/Order');

const createOrder = async (req, res) => {
    try {
        const { shippingAddress, paymentMethod, items } = req.body;
        
        // Usa req.userId, que es donde el middleware 'verifyToken' coloca el id
        const order = new Order({
            userId: req.userId, // Cambia 'req.userData.id' a 'req.userId'
            shippingAddress,
            paymentMethod,
            items,
        });

        // Guardar el pedido en la base de datos
        await order.save();

        // Responder con éxito
        res.status(201).json({
            message: 'Pedido realizado con éxito',
            order
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error al crear el pedido',
            error: err.message
        });
    }
};

module.exports = { createOrder };
