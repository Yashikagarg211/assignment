import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getOrders } from '../api/api'
import styles from './OrdersPage.module.css'

const STATUS_COLOR = {
  CONFIRMED: { bg: '#e8f5e9', color: '#388e3c' },
  SHIPPED: { bg: '#e3f2fd', color: '#1565c0' },
  DELIVERED: { bg: '#f3e5f5', color: '#6a1b9a' },
  CANCELLED: { bg: '#ffebee', color: '#c62828' },
}

export default function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getOrders().then(setOrders).catch(console.error).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="spinner-wrap"><div className="spinner" /></div>

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>My Orders</h1>
        <p className={styles.sub}>{orders.length} order{orders.length !== 1 ? 's' : ''} placed</p>
      </div>

      {orders.length === 0 ? (
        <div className={styles.empty}>
          <span style={{ fontSize: 72 }}>📦</span>
          <h2>No orders yet</h2>
          <p>Looks like you haven't placed any orders yet.</p>
          <Link to="/products" className="btn btn-primary">Start Shopping</Link>
        </div>
      ) : (
        <div className={styles.ordersList}>
          {orders.map(order => {
            const statusStyle = STATUS_COLOR[order.status] || STATUS_COLOR.CONFIRMED
            return (
              <div key={order.id} className={styles.orderCard}>
                {/* Order Header */}
                <div className={styles.orderHeader}>
                  <div className={styles.orderMeta}>
                    <span className={styles.orderId}>Order #{String(order.id).padStart(8, '0')}</span>
                    <span className={styles.orderDate}>
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'long', year: 'numeric'
                      })}
                    </span>
                  </div>
                  <span
                    className={styles.statusBadge}
                    style={{ background: statusStyle.bg, color: statusStyle.color }}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Items */}
                <div className={styles.itemsRow}>
                  {order.orderItems.map(item => (
                    <div key={item.id} className={styles.orderItem}>
                      <img
                        src={item.product.images?.[0]?.url}
                        alt={item.product.name}
                        className={styles.itemImg}
                      />
                      <div className={styles.itemDetails}>
                        <Link to={`/products/${item.productId}`} className={styles.itemName}>
                          {item.product.name}
                        </Link>
                        <p className={styles.itemMeta}>
                          Qty: {item.quantity} &nbsp;·&nbsp; ₹{parseInt(item.priceAtPurchase).toLocaleString('en-IN')} each
                        </p>
                        <p className={styles.itemTotal}>
                          ₹{(parseFloat(item.priceAtPurchase) * item.quantity).toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className={styles.orderFooter}>
                  <div className={styles.addressInfo}>
                    <span className={styles.addressIcon}>📍</span>
                    <span className={styles.addressText}>
                      {order.address.name} — {order.address.city}, {order.address.state} {order.address.pincode}
                    </span>
                  </div>
                  <div className={styles.totalInfo}>
                    <span className={styles.totalLabel}>Order Total</span>
                    <span className={styles.totalAmt}>₹{parseFloat(order.total).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
