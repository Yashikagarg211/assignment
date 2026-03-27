import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCart, placeOrder } from '../api/api'
import useCartStore from '../store/cartStore'
import styles from './CheckoutPage.module.css'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const fetchCart = useCartStore(s => s.fetchCart)
  const [form, setForm] = useState({
    name: '', phone: '', street: '', city: '', state: '', pincode: ''
  })

  useEffect(() => {
    getCart().then(setCartItems).catch(console.error)
  }, [])

  const subtotal = cartItems.reduce((s, i) => s + parseFloat(i.product.price) * i.quantity, 0)
  const shipping = cartItems.length > 0 ? 40 : 0
  const total = subtotal + shipping

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Full name is required'
    if (!/^\d{10}$/.test(form.phone)) e.phone = 'Enter valid 10-digit phone number'
    if (!form.street.trim()) e.street = 'Address is required'
    if (!form.city.trim()) e.city = 'City is required'
    if (!form.state.trim()) e.state = 'State is required'
    if (!/^\d{6}$/.test(form.pincode)) e.pincode = 'Enter valid 6-digit pincode'
    return e
  }

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setLoading(true)
    try {
      const order = await placeOrder(form)
      await fetchCart()
      navigate(`/order-confirmation/${order.id}`)
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (cartItems.length === 0) {
    return <div className={styles.empty}>Your cart is empty. <span onClick={() => navigate('/products')} style={{color:'var(--blue)',cursor:'pointer'}}>Shop now</span></div>
  }

  return (
    <div className="page-layout">
      {/* Address Form */}
      <div className={styles.formCol}>
        <div className={styles.formCard}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.step}>1</span> Delivery Address
          </h2>
          <form onSubmit={handleSubmit} className={styles.form} id="checkout-form">
            <div className={styles.row}>
              <div className={styles.field}>
                <label>Full Name *</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Enter full name" className={errors.name ? styles.inputErr : ''} />
                {errors.name && <p className={styles.err}>{errors.name}</p>}
              </div>
              <div className={styles.field}>
                <label>Phone Number *</label>
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="10-digit mobile number" maxLength={10} className={errors.phone ? styles.inputErr : ''} />
                {errors.phone && <p className={styles.err}>{errors.phone}</p>}
              </div>
            </div>
            <div className={styles.field}>
              <label>Address (House No, Street, Area) *</label>
              <input name="street" value={form.street} onChange={handleChange} placeholder="House No, Building, Street, Area" className={errors.street ? styles.inputErr : ''} />
              {errors.street && <p className={styles.err}>{errors.street}</p>}
            </div>
            <div className={styles.row}>
              <div className={styles.field}>
                <label>City *</label>
                <input name="city" value={form.city} onChange={handleChange} placeholder="City" className={errors.city ? styles.inputErr : ''} />
                {errors.city && <p className={styles.err}>{errors.city}</p>}
              </div>
              <div className={styles.field}>
                <label>State *</label>
                <input name="state" value={form.state} onChange={handleChange} placeholder="State" className={errors.state ? styles.inputErr : ''} />
                {errors.state && <p className={styles.err}>{errors.state}</p>}
              </div>
              <div className={styles.field}>
                <label>Pincode *</label>
                <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="6-digit pincode" maxLength={6} className={errors.pincode ? styles.inputErr : ''} />
                {errors.pincode && <p className={styles.err}>{errors.pincode}</p>}
              </div>
            </div>
            <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={loading} id="place-order-btn">
              {loading ? 'Placing Order...' : '🎉 Place Order'}
            </button>
          </form>
        </div>
      </div>

      {/* Order Summary */}
      <div className={styles.summaryCol}>
        <div className={styles.summaryCard}>
          <h2 className={styles.sectionTitle}><span className={styles.step}>2</span> Order Summary</h2>
          <div className={styles.itemsList}>
            {cartItems.map(item => (
              <div key={item.id} className={styles.orderItem}>
                <img src={item.product.images?.[0]?.url} alt={item.product.name} className={styles.orderItemImg} />
                <div>
                  <p className={styles.orderItemName}>{item.product.name}</p>
                  <p className={styles.orderItemMeta}>Qty: {item.quantity} × ₹{parseInt(item.product.price).toLocaleString('en-IN')}</p>
                </div>
                <span className={styles.orderItemPrice}>₹{(parseFloat(item.product.price)*item.quantity).toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
          <div className={styles.divider} />
          <div className={styles.priceRows}>
            <div className={styles.priceRow}><span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
            <div className={styles.priceRow}><span>Shipping</span><span className={styles.green}>₹{shipping}</span></div>
            <div className={styles.divider} />
            <div className={`${styles.priceRow} ${styles.totalRow}`}><span>Total</span><span>₹{total.toLocaleString('en-IN')}</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
