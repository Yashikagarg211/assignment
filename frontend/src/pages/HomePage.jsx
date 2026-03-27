import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getProducts, getCategories } from '../api/api'
import ProductCard from '../components/ProductCard'
import styles from './HomePage.module.css'

const HERO_SLIDES = [
  { bg: 'linear-gradient(135deg,#0d47a1,#1565c0)', title: 'Biggest Deals on Smartphones', sub: 'Up to 40% off on top brands', img: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400', link: '/products?category=mobiles' },
  { bg: 'linear-gradient(135deg,#1a237e,#283593)', title: 'Laptop Bonanza', sub: 'Top laptops at unbeatable prices', img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400', link: '/products?category=laptops' },
  { bg: 'linear-gradient(135deg,#b71c1c,#c62828)', title: 'Fashion Sale', sub: 'Trending styles for every occasion', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', link: '/products?category=fashion' },
]

export default function HomePage() {
  const [categories, setCategories] = useState([])
  const [featured, setFeatured] = useState([])
  const [slide, setSlide] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error)
    getProducts({ limit: 12, sort: 'rating' }).then(d => setFeatured(d.products)).catch(console.error)
    const timer = setInterval(() => setSlide(s => (s + 1) % HERO_SLIDES.length), 4000)
    return () => clearInterval(timer)
  }, [])

  const s = HERO_SLIDES[slide]

  return (
    <div>
      {/* Hero Banner */}
      <div className={styles.hero} style={{ background: s.bg }}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>{s.title}</h1>
            <p className={styles.heroSub}>{s.sub}</p>
            <Link to={s.link} className={`btn btn-yellow ${styles.heroBtn}`}>Shop Now</Link>
          </div>
          <img src={s.img} alt="Hero" className={styles.heroImg} />
        </div>
        <div className={styles.dots}>
          {HERO_SLIDES.map((_, i) => (
            <button key={i} className={`${styles.dot} ${i === slide ? styles.activeDot : ''}`} onClick={() => setSlide(i)} />
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="container" style={{ marginTop: 24 }}>
        <div className={styles.categorySection}>
          <h2 className={styles.sectionTitle}>Shop by Category</h2>
          <div className={styles.categories}>
            {categories.map(cat => (
              <Link key={cat.id} to={`/products?category=${cat.slug}`} className={styles.catCard}>
                <div className={styles.catImgWrap}>
                  <img src={cat.imageUrl} alt={cat.name} className={styles.catImg} />
                </div>
                <p className={styles.catName}>{cat.name}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Top Rated Products</h2>
            <Link to="/products" className={styles.viewAll}>View All →</Link>
          </div>
          <div className={styles.productGrid}>
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>

        {/* Deals Banner */}
        <div className={styles.dealBanner}>
          <div className={styles.dealText}>
            <h3>🔥 Today's Best Deals</h3>
            <p>Limited time offers across all categories</p>
          </div>
          <Link to="/products" className="btn btn-yellow">Explore Deals</Link>
        </div>
      </div>
    </div>
  )
}
