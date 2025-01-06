const mongoose = require('mongoose');

// Definir el esquema para un pedido
const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Referencia al modelo de Usuario
        required: true,
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product', // Referencia al modelo de Producto
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    shippingAddress: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pendiente', 'en proceso', 'enviado', 'entregado'],
        default: 'pendiente',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Crear el modelo a partir del esquema
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
