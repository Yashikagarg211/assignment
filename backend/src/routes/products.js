const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

// GET /api/products?search=&category=&page=1&limit=12&sort=
router.get('/', async (req, res) => {
  try {
    const { search, category, page = 1, limit = 12, sort = 'newest' } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = {};
    if (search) where.name = { contains: search, mode: 'insensitive' };
    if (category) where.category = { slug: category };

    let orderBy = { createdAt: 'desc' };
    if (sort === 'price-asc') orderBy = { price: 'asc' };
    else if (sort === 'price-desc') orderBy = { price: 'desc' };
    else if (sort === 'rating') orderBy = { rating: 'desc' };
    else if (sort === 'popularity') orderBy = { reviewCount: 'desc' };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where, skip, take: parseInt(limit), orderBy,
        include: {
          category: { select: { id: true, name: true, slug: true } },
          images: { where: { isPrimary: true }, take: 1 }
        }
      }),
      prisma.product.count({ where })
    ]);

    res.json({ products, total, page: parseInt(page), limit: parseInt(limit), totalPages: Math.ceil(total / parseInt(limit)) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        category: true,
        images: { orderBy: { sortOrder: 'asc' } },
        specs: true
      }
    });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

module.exports = router;
