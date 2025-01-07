const Product = require('../models/Product');
const axios = require('axios');

// Obtener todos los productos
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: "Error al obtener los productos", error: err.message });
    }
};

// Obtener un producto por ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: "Error al obtener el producto", error: err.message });
    }
};

// Crear un nuevo producto (solo admin)
const createProduct = async (req, res) => {
    const { name, description, price, category } = req.body;

    if (!name || !price || !category) {
        return res.status(400).json({ message: 'Faltan campos requeridos.' });
    }

    try {
        const newProduct = new Product({ name, description, price, category });
        await newProduct.save();
        res.status(201).json({ message: "Producto creado con éxito", product: newProduct });

        // Crear reseña (esto lo puedes hacer sin hacer una llamada HTTP)
        const reviewData = req.body.review; // Suponiendo que la reseña se envía en el cuerpo de la solicitud
        if (reviewData) {
            await ReviewController.createReview(newProduct._id, reviewData); // Llamar a la lógica de reseñas directamente
        }
    } catch (err) {
        res.status(500).json({ message: "Error al crear el producto", error: err.message });
    }
};

// Actualizar un producto
const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json({ message: "Producto actualizado", product: updatedProduct });
    } catch (err) {
        res.status(500).json({ message: "Error al actualizar el producto", error: err.message });
    }
};

// Eliminar un producto
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json({ message: "Producto eliminado", product: deletedProduct });
    } catch (err) {
        res.status(500).json({ message: "Error al eliminar el producto", error: err.message });
    }
};

const getProductReviews = async (req, res) => {
    const productId = req.params.productId;

    try {
        const reviews = await ProductReview.find({ productId });

        // Para cada reseña, obtenemos información del usuario llamando al users-service
        const reviewsWithUserData = await Promise.all(
            reviews.map(async (review) => {
                try {
                    const response = await axios.get(`http://users-service:3005/api/users/${review.userId}`);
                    const userData = response.data;
                    return { ...review._doc, user: userData };
                } catch (error) {
                    console.error(`Error al obtener usuario: ${review.userId}`, error.message);
                    return { ...review._doc, user: null };
                }
            })
        );

        res.json(reviewsWithUserData);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las reseñas', error: error.message });
    }
};

// Obtener detalles del producto junto con un resumen de las reseñas
const getProductDetailsWithReviews = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        // Obtener resumen de reseñas del servicio de reseñas
        const reviewsSummary = await axios.get(`http://reviews-service:3006/api/reviews/summary/${req.params.id}`);
        const reviews = reviewsSummary.data;

        res.status(200).json({ product, reviews });
    } catch (err) {
        res.status(500).json({ message: "Error al obtener los detalles del producto", error: err.message });
    }
};

// Actualizar el stock de un producto
const updateProductStock = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        product.stock += req.body.quantity;
        await product.save();

        res.status(200).json({ message: "Stock actualizado", product });
    } catch (err) {
        res.status(500).json({ message: "Error al actualizar el stock", error: err.message });
    }
};

module.exports = { 
    getAllProducts, 
    getProductById, 
    createProduct, 
    updateProduct, 
    deleteProduct, 
    getProductReviews, 
    getProductDetailsWithReviews,
    updateProductStock
};