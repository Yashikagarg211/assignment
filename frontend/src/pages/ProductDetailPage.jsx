import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProduct } from '../api/api'
import useCartStore from '../store/cartStore'
import ImageCarousel from '../components/ImageCarousel'
import StarRating from '../components/StarRating'
import styles from './ProductDetailPage.module.css'

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [qty, setQty] = useState(1)
  const [addMsg, setAddMsg] = useState('')
  const addToCart = useCartStore(s => s.addToCart)

  useEffect(() => {
    setLoading(true)
    getProduct(id).then(setProduct).catch(console.error).finally(() => setLoading(false))
  }, [id])

  const handleAddToCart = async () => {
    const res = await addToCart(parseInt(id), qty)
    if (res.success) {
      setAddMsg('✅ Added to cart!')
      setTimeout(() => setAddMsg(''), 2500)
    } else {
      setAddMsg(`❌ ${res.error}`)
    }
  }

  const handleBuyNow = async () => {
    await addToCart(parseInt(id), qty)
    navigate('/cart')
  }

  if (loading) return <div className="spinner-wrap"><div className="spinner" /></div>
  if (!product) return <div style={{padding:40,textAlign:'center'}}>Product not found.</div>

  const discount = product.discountPct
  const inStock = product.stock > 0

  return (
    <div className="container" style={{ marginTop: 16 }}>
      <div className={styles.breadcrumb}>
        <span onClick={() => navigate('/')} className={styles.crumbLink}>Home</span>
        <span className={styles.sep}>›</span>
        <span onClick={() => navigate(`/products?category=${product.category?.slug}`)} className={styles.crumbLink}>{product.category?.name}</span>
        <span className={styles.sep}>›</span>
        <span className={styles.crumbCurrent}>{product.name}</span>
      </div>

      <div className={styles.layout}>
        {/* Left: Images */}
        <div className={styles.imageCol}>
          <ImageCarousel images={product.images} />
          <div className={styles.actionBtns}>
            <button className={`btn btn-yellow ${styles.btn}`} onClick={handleAddToCart} disabled={!inStock} id="add-to-cart-btn">
              🛒 ADD TO CART
            </button>
            <button className={`btn btn-primary ${styles.btn}`} onClick={handleBuyNow} disabled={!inStock} id="buy-now-btn">
              ⚡ BUY NOW
            </button>
          </div>
          {addMsg && <div className={styles.addMsg}>{addMsg}</div>}
        </div>

        {/* Right: Details */}
        <div className={styles.detailCol}>
          <p className={styles.brand}>{product.brand}</p>
          <h1 className={styles.name}>{product.name}</h1>

          <div className={styles.ratingRow}>
            <span className={styles.ratingBadge}>{parseFloat(product.rating).toFixed(1)} ★</span>
            <span className={styles.ratingCount}>{product.reviewCount?.toLocaleString()} ratings</span>
          </div>

          <div className={styles.divider} />

          <div className={styles.priceSection}>
            {discount > 0 && <span className={styles.discBadge}>{discount}% off</span>}
            <div className={styles.priceRow}>
              <span className={styles.price}>₹{parseInt(product.price).toLocaleString('en-IN')}</span>
              {discount > 0 && <span className={styles.mrp}>₹{parseInt(product.mrp).toLocaleString('en-IN')}</span>}
            </div>
            <p className={styles.taxNote}>Inclusive of all taxes</p>
          </div>

          <div className={styles.divider} />

          {/* Stock + Qty */}
          <div className={styles.stockRow}>
            <span className={inStock ? styles.inStock : styles.outStock}>
              {inStock ? `✓ In Stock (${product.stock} available)` : '✗ Out of Stock'}
            </span>
          </div>

          {inStock && (
            <div className={styles.qtyRow}>
              <span className={styles.qtyLabel}>Quantity:</span>
              <div className="qty-control">
                <button className="qty-btn" onClick={() => setQty(q => Math.max(1,q-1))}>−</button>
                <span className="qty-num">{qty}</span>
                <button className="qty-btn" onClick={() => setQty(q => Math.min(product.stock,q+1))}>+</button>
              </div>
            </div>
          )}

          {/* Description */}
          {product.description && (
            <>
              <div className={styles.divider} />
              <div className={styles.descSection}>
                <h2 className={styles.secTitle}>About this item</h2>
                <p className={styles.desc}>{product.description}</p>
              </div>
            </>
          )}

          {/* Specs */}
          {product.specs?.length > 0 && (
            <>
              <div className={styles.divider} />
              <div>
                <h2 className={styles.secTitle}>Specifications</h2>
                <table className={styles.specTable}>
                  <tbody>
                    {product.specs.map((s, i) => (
                      <tr key={i} className={styles.specRow}>
                        <td className={styles.specKey}>{s.key}</td>
                        <td className={styles.specVal}>{s.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
