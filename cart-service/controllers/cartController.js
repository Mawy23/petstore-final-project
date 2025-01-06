const Cart = require('../models/Cart');

exports.addItemToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.userId; // Asumimos que el ID del usuario se obtiene del token

    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            // Si no existe un carrito, lo creamos
            cart = new Cart({ userId, items: [{ productId, quantity }] });
        } else {
            // Si el carrito ya existe, añadimos el producto
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity; // Si el producto ya está en el carrito, sumamos la cantidad
            } else {
                cart.items.push({ productId, quantity });
            }
        }

        await cart.save();
        res.status(200).json({ message: "Producto añadido al carrito", cart });
    } catch (error) {
        res.status(500).json({ message: "Error al añadir al carrito", error: error.message });
    }
};

exports.getCart = async (req, res) => {
    const userId = req.userId;

    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart) {
            return res.status(404).json({ message: "Carrito vacío" });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el carrito", error: error.message });
    }
};

exports.removeItemFromCart = async (req, res) => {
    const { itemId } = req.params;
    const userId = req.userId;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }

        const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);
        if (itemIndex > -1) {
            cart.items.splice(itemIndex, 1); // Eliminamos el producto del carrito
            await cart.save();
            res.status(200).json({ message: "Producto eliminado del carrito", cart });
        } else {
            res.status(404).json({ message: "Producto no encontrado en el carrito" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar producto", error: error.message });
    }
};
