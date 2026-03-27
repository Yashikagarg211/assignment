import { Link } from 'react-router-dom'
import styles from './ProductCard.module.css'

export default function ProductCard({ product }) {
  const img = product.images?.[0]?.url || 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400'
  const discount = product.discountPct

  return (
    <Link to={`/products/${product.id}`} className={styles.card}>
      <div className={styles.imgWrap}>
        <img src={img} alt={product.name} className={styles.img} loading="lazy" />
        {discount > 0 && <span className={styles.discTag}>{discount}% off</span>}
      </div>
      <div className={styles.info}>
        <p className={styles.name}>{product.name}</p>
        <div className={styles.ratingRow}>
          <span className={styles.rating}>
            {parseFloat(product.rating).toFixed(1)} ★
          </span>
          <span className={styles.reviewCount}>({product.reviewCount?.toLocaleString()})</span>
        </div>
        <div className={styles.priceRow}>
          <span className={styles.price}>₹{parseInt(product.price).toLocaleString('en-IN')}</span>
          {discount > 0 && (
            <>
              <span className={styles.mrp}>₹{parseInt(product.mrp).toLocaleString('en-IN')}</span>
              <span className={styles.discount}>{discount}% off</span>
            </>
          )}
        </div>
        <p className={styles.brand}>{product.brand}</p>
      </div>
    </Link>
  )
}
