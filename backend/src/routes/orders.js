const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

const DEFAULT_USER_ID = 1;

// POST /api/orders
router.post('/', async (req, res) => {
  try {
    const { name, phone, street, city, state, pincode } = req.body;
    if (!name || !phone || !street || !city || !state || !pincode) {
      return res.status(400).json({ error: 'All address fields are required' });
    }

    // Get cart items
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: DEFAULT_USER_ID },
      include: { product: true }
    });
    if (cartItems.length === 0) return res.status(400).json({ error: 'Cart is empty' });

    // Check stock
    for (const item of cartItems) {
      if (item.product.stock < item.quantity) {
        return res.status(400).json({ error: `Insufficient stock for ${item.product.name}` });
      }
    }

    // Create address
    const address = await prisma.address.create({
      data: { userId: DEFAULT_USER_ID, name, phone, street, city, state, pincode }
    });

    const subtotal = cartItems.reduce((sum, item) => sum + parseFloat(item.product.price) * item.quantity, 0);
    const total = subtotal + 40; // shipping

    // Create order + items + update stock in transaction
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          userId: DEFAULT_USER_ID,
          addressId: address.id,
          subtotal,
          total,
          status: 'CONFIRMED',
          orderItems: {
            create: cartItems.map(item => ({
              productId: item.productId,
              quantity: item.quantity,
              priceAtPurchase: item.product.price
            }))
          }
        },
        include: {
          orderItems: { include: { product: { include: { images: { where: { isPrimary: true }, take: 1 } } } } },
          address: true
        }
      });

      // Update stock
      for (const item of cartItems) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } }
        });
      }

      // Clear cart
      await tx.cartItem.deleteMany({ where: { userId: DEFAULT_USER_ID } });

      return newOrder;
    });

    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to place order' });
  }
});

// GET /api/orders
router.get('/', async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: DEFAULT_USER_ID },
      include: {
        orderItems: { include: { product: { include: { images: { where: { isPrimary: true }, take: 1 } } } } },
        address: true
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// GET /api/orders/:id
router.get('/:id', async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        orderItems: { include: { product: { include: { images: { where: { isPrimary: true }, take: 1 } } } } },
        address: true
      }
    });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

module.exports = router;
