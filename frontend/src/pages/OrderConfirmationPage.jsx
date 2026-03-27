import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getOrder } from '../api/api'
import styles from './OrderConfirmationPage.module.css'

export default function OrderConfirmationPage() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getOrder(id).then(setOrder).catch(console.error).finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="spinner-wrap"><div className="spinner" /></div>
  if (!order) return <div style={{padding:40,textAlign:'center'}}>Order not found.</div>

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* Success animation */}
        <div className={styles.successIcon}>
          <svg viewBox="0 0 52 52" className={styles.checkmark}>
            <circle cx="26" cy="26" r="25" fill="none" className={styles.checkmarkCircle} />
            <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" className={styles.checkmarkCheck} />
          </svg>
        </div>

        <h1 className={styles.title}>Order Placed Successfully! 🎉</h1>
        <p className={styles.sub}>Thank you for shopping with us</p>

        <div className={styles.orderIdBox}>
          <span className={styles.orderIdLabel}>Order ID</span>
          <span className={styles.orderId}>#{String(order.id).padStart(8, '0')}</span>
        </div>

        {/* Order items */}
        <div className={styles.items}>
          <h3 className={styles.itemsTitle}>Items Ordered ({order.orderItems.length})</h3>
          {order.orderItems.map(item => (
            <div key={item.id} className={styles.item}>
              <img src={item.product.images?.[0]?.url} alt={item.product.name} className={styles.itemImg} />
              <div className={styles.itemInfo}>
                <p className={styles.itemName}>{item.product.name}</p>
                <p className={styles.itemMeta}>Qty: {item.quantity} × ₹{parseInt(item.priceAtPurchase).toLocaleString('en-IN')}</p>
              </div>
              <span className={styles.itemTotal}>₹{(parseFloat(item.priceAtPurchase)*item.quantity).toLocaleString('en-IN')}</span>
            </div>
          ))}
        </div>

        {/* Delivery address */}
        <div className={styles.addressBox}>
          <h3 className={styles.addressTitle}>📦 Delivery Address</h3>
          <p className={styles.addressText}>
            {order.address.name} | {order.address.phone}<br />
            {order.address.street}, {order.address.city}, {order.address.state} — {order.address.pincode}
          </p>
        </div>

        {/* Total */}
        <div className={styles.totalBox}>
          <span>Total Paid</span>
          <span className={styles.totalAmt}>₹{parseFloat(order.total).toLocaleString('en-IN')}</span>
        </div>

        {/* Status */}
        <div className={styles.statusBadge}>✅ {order.status}</div>

        <div className={styles.actions}>
          <Link to="/products" className="btn btn-primary">Continue Shopping</Link>
        </div>
      </div>
    </div>
  )
}
