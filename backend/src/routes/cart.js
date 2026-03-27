const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

const DEFAULT_USER_ID = 1; // Default guest user

// GET /api/cart
router.get('/', async (req, res) => {
  try {
    const items = await prisma.cartItem.findMany({
      where: { userId: DEFAULT_USER_ID },
      include: {
        product: {
          include: { images: { where: { isPrimary: true }, take: 1 } }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// POST /api/cart
router.post('/', async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    if (!productId) return res.status(400).json({ error: 'productId is required' });

    const product = await prisma.product.findUnique({ where: { id: parseInt(productId) } });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    if (product.stock < quantity) return res.status(400).json({ error: 'Insufficient stock' });

    const item = await prisma.cartItem.upsert({
      where: { userId_productId: { userId: DEFAULT_USER_ID, productId: parseInt(productId) } },
      update: { quantity: { increment: parseInt(quantity) } },
      create: { userId: DEFAULT_USER_ID, productId: parseInt(productId), quantity: parseInt(quantity) },
      include: { product: { include: { images: { where: { isPrimary: true }, take: 1 } } } }
    });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});

// PUT /api/cart/:id
router.put('/:id', async (req, res) => {
  try {
    const { quantity } = req.body;
    if (!quantity || quantity < 1) return res.status(400).json({ error: 'Quantity must be >= 1' });

    const item = await prisma.cartItem.update({
      where: { id: parseInt(req.params.id) },
      data: { quantity: parseInt(quantity) },
      include: { product: { include: { images: { where: { isPrimary: true }, take: 1 } } } }
    });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update cart item' });
  }
});

// DELETE /api/cart/:id
router.delete('/:id', async (req, res) => {
  try {
    await prisma.cartItem.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove cart item' });
  }
});

// DELETE /api/cart (clear all)
router.delete('/', async (req, res) => {
  try {
    await prisma.cartItem.deleteMany({ where: { userId: DEFAULT_USER_ID } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to clear cart' });
  }
});

module.exports = router;
