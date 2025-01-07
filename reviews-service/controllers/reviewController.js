const axios = require('axios');  // Instala axios si aún no lo has hecho
const Review = require('../models/Review');


// Crear reseña (sin cambios)
const createReview = async (req, res) => {
    const { productId, rating, comment } = req.body;
    const userId = req.userId;  // Accede al 'userId' desde el middleware 'verifyToken'

    if (!userId) {
        return res.status(400).json({ message: 'No se pudo obtener el ID del usuario' });
    }

    try {
        // Realizar una solicitud al microservicio de productos para verificar si el producto existe
        const productResponse = await axios.get(`http://products-service:3004/api/products/${productId}`);
        const product = productResponse.data;

        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        // Verificar si el usuario ya ha dejado una reseña para el producto
        const existingReview = await Review.findOne({ productId, userId });
        if (existingReview) {
            return res.status(400).json({ message: "Ya has dejado una reseña para este producto." });
        }

        // Crear la nueva reseña
        const review = new Review({
            productId,
            userId,
            rating,
            comment
        });

        // Guardar la reseña en la base de datos
        await review.save();
        res.status(201).json({ message: "Reseña creada con éxito", review });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error al crear la reseña", error: err.message });
    }
};

const getReviewsByProduct = async (req, res) => {
    const productId = req.params.productId;

    try {
        const reviews = await Review.find({ productId });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las reseñas', error: error.message });
    }
}

// Obtener resumen de reseñas por producto
const getReviewsSummaryByProduct = async (req, res) => {
    const productId = req.params.productId;

    try {
        const reviews = await Review.find({ productId });
        const summary = {
            totalReviews: reviews.length,
            averageRating: reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length || 0
        };
        res.json(summary);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el resumen de las reseñas', error: error.message });
    }
};

module.exports = { 
    createReview, 
    getReviewsByProduct, 
    getReviewsSummaryByProduct 
};
