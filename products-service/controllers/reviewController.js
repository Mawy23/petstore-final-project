const Review = require('../models/Review');
const Product = require('../models/Product');

// Función para obtener reseñas de un producto
exports.getReviewsByProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        const reviews = await Review.find({ productId }).populate('userId', 'username');
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ message: "Error al obtener las reseñas", error: err.message });
    }
};

// Crear una nueva reseña
exports.createReview = async (req, res) => {
    const { productId, rating, comment } = req.body;
    const userId = req.userData.id;  // Suponiendo que el token JWT tiene el ID del usuario

    try {
        // Verificar que el producto existe
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        // Verificar que el usuario no haya creado una reseña para este producto
        const existingReview = await Review.findOne({ productId, userId });
        if (existingReview) {
            return res.status(400).json({ message: "Ya has dejado una reseña para este producto." });
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
