import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useCartStore from '../store/cartStore'
import styles from './CartPage.module.css'

export default function CartPage() {
  const { items, loading, fetchCart, updateQuantity, removeItem } = useCartStore()
  const navigate = useNavigate()

  useEffect(() => { fetchCart() }, [fetchCart])

  const subtotal = items.reduce((s, i) => s + parseFloat(i.product.price) * i.quantity, 0)
  const mrpTotal = items.reduce((s, i) => s + parseFloat(i.product.mrp) * i.quantity, 0)
  const saving = mrpTotal - subtotal
  const shipping = items.length > 0 ? 40 : 0
  const total = subtotal + shipping

  if (loading) return <div className="spinner-wrap"><div className="spinner" /></div>

  if (items.length === 0) return (
    <div className={styles.emptyCart}>
      <span style={{fontSize:80}}>🛒</span>
      <h2>Your cart is empty!</h2>
      <p>Add items to it now.</p>
      <Link to="/products" className="btn btn-primary">Shop Now</Link>
    </div>
  )

  return (
    <div className="page-layout">
      {/* Items */}
      <div className={styles.itemsCol}>
        <div className={styles.cartHeader}>
          <h1 className={styles.cartTitle}>My Cart <span>({items.length} items)</span></h1>
        </div>
        {items.map(item => {
          const img = item.product.images?.[0]?.url
          const price = parseFloat(item.product.price)
          const mrp = parseFloat(item.product.mrp)
          const disc = item.product.discountPct
          return (
            <div key={item.id} className={styles.cartItem}>
              <Link to={`/products/${item.productId}`}>
                <img src={img} alt={item.product.name} className={styles.itemImg} />
              </Link>
              <div className={styles.itemInfo}>
                <Link to={`/products/${item.productId}`} className={styles.itemName}>{item.product.name}</Link>
                <p className={styles.itemBrand}>{item.product.brand}</p>
                <div className={styles.itemPriceRow}>
                  <span className={styles.itemPrice}>₹{(price * item.quantity).toLocaleString('en-IN')}</span>
                  {disc > 0 && <span className={styles.itemMrp}>₹{(mrp * item.quantity).toLocaleString('en-IN')}</span>}
                  {disc > 0 && <span className={styles.itemDisc}>{disc}% off</span>}
                </div>
                <div className={styles.itemActions}>
                  <div className="qty-control">
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>−</button>
                    <span className="qty-num">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)} disabled={item.quantity >= item.product.stock}>+</button>
                  </div>
                  <button className={styles.removeBtn} onClick={() => removeItem(item.id)}>REMOVE</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary */}
      <div className={styles.summary}>
        <div className={styles.summaryCard}>
          <h2 className={styles.summaryTitle}>PRICE DETAILS</h2>
          <div className={styles.divider} />
          <div className={styles.summaryRow}>
            <span>Price ({items.length} items)</span>
            <span>₹{mrpTotal.toLocaleString('en-IN')}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Discount</span>
            <span className={styles.saving}>− ₹{saving.toLocaleString('en-IN')}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Delivery Charges</span>
            <span className={styles.green}>₹{shipping}</span>
          </div>
          <div className={styles.divider} />
          <div className={`${styles.summaryRow} ${styles.totalRow}`}>
            <span>Total Amount</span>
            <span>₹{total.toLocaleString('en-IN')}</span>
          </div>
          <div className={styles.divider} />
          {saving > 0 && (
            <p className={styles.savingBanner}>🎉 You will save ₹{saving.toLocaleString('en-IN')} on this order</p>
          )}
          <button className={`btn btn-primary btn-lg`} onClick={() => navigate('/checkout')} id="checkout-btn">
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  )
}
