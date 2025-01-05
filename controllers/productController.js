const Product = require('../models/Product');

// Obtener todos los productos
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: "Error al obtener los productos", error: err.message });
    }
};

// Obtener un producto por ID
exports.getProductById = async (req, res) => {
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
exports.createProduct = async (req, res) => {
    const { name, description, price, category } = req.body;

    if (!name || !price || !category) {
        return res.status(400).json({ message: 'Faltan campos requeridos.' });
    }

    try {
        const newProduct = new Product({ name, description, price, category });
        await newProduct.save();
        res.status(201).json({ message: "Producto creado con éxito", product: newProduct });
    } catch (err) {
        res.status(500).json({ message: "Error al crear el producto", error: err.message });
    }
};

// Actualizar un producto
exports.updateProduct = async (req, res) => {
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
exports.deleteProduct = async (req, res) => {
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
