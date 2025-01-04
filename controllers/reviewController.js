const Review = require('../models/Review');
const Product = require('../models/Product');  // Para verificar si el producto existe
const User = require('../models/User');  // Para verificar si el usuario existe

// Crear una nueva reseña
exports.createReview = async (req, res) => {
    const { productId, rating, comment } = req.body;
    const userId = req.user.id;  // Suponiendo que el token JWT tiene el ID del usuario

    try {
        // Verificar que el producto existe
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        // Crear la reseña
        const review = new Review({
            productId,
            userId,
            rating,
            comment
        });

        await review.save();
        res.status(201).json({ message: "Reseña creada con éxito", review });
    } catch (err) {
        res.status(500).json({ message: "Error al crear la reseña", error: err.message });
    }
};

// Obtener reseñas de un producto
exports.getReviewsByProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        const reviews = await Review.find({ productId }).populate('userId', 'username');
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ message: "Error al obtener las reseñas", error: err.message });
    }
};
