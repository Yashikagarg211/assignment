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
  const [apiOnline, setApiOnline] = useState(true)
  const [loading, setLoading] = useState(true)
  const [slowLoad, setSlowLoad] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // After 4 seconds without data, show "waking up backend" banner
    const slowTimer = setTimeout(() => {
      if (loading) setSlowLoad(true)
    }, 4000)

    getCategories()
      .then(setCategories)
      .catch(() => setApiOnline(false))

    getProducts({ limit: 12, sort: 'rating' })
      .then(d => {
        setFeatured(d.products)
        setLoading(false)
        setSlowLoad(false)
      })
      .catch(() => {
        setLoading(false)
        setApiOnline(false)
      })

    const timer = setInterval(() => setSlide(s => (s + 1) % HERO_SLIDES.length), 4000)
    return () => { clearInterval(timer); clearTimeout(slowTimer) }
  }, [])

  const s = HERO_SLIDES[slide]

  return (
    <div>
      {/* Waking up banner — shows when backend is slow to respond */}
      {slowLoad && apiOnline && (
        <div style={{
          background: '#e8f4fd', color: '#0d47a1', padding: '10px 20px',
          textAlign: 'center', fontSize: 13, fontWeight: 500,
          borderBottom: '1px solid #90caf9', display: 'flex',
          alignItems: 'center', justifyContent: 'center', gap: 10
        }}>
          <span style={{ display: 'inline-block', width: 14, height: 14, border: '2px solid #0d47a1', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          ⏳ Backend is waking up (Render free tier) — products will appear in ~30 seconds…
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        </div>
      )}
      {/* Offline banner — shows when backend is completely unreachable */}
      {!apiOnline && (
        <div style={{
          background: '#fff3cd', color: '#856404', padding: '10px 20px',
          textAlign: 'center', fontSize: 13, fontWeight: 500,
          borderBottom: '1px solid #ffc107'
        }}>
          ⚠️ Backend API is not connected — product data unavailable. Please try refreshing in 30 seconds.
        </div>
      )}

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
