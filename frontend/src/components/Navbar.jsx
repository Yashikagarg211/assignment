import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useCartStore from '../store/cartStore'
import styles from './Navbar.module.css'

export default function Navbar() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const items = useCartStore(s => s.items)
  const fetchCart = useCartStore(s => s.fetchCart)
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0)

  useEffect(() => { fetchCart() }, [fetchCart])

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); setSearchOpen(false) }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`)
      setSearchOpen(false)
      setMenuOpen(false)
    }
  }

  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        {/* Logo */}
        <Link to="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
          <span className={styles.logoText}>Flipkart</span>
          <span className={styles.logoTagline}>
            <em>Explore</em>
            <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/plus_icon-eed5527c.png" alt="plus" width="10" height="10" style={{marginLeft:2}} />
          </span>
        </Link>

        {/* Desktop Search */}
        <form className={`${styles.searchForm} ${styles.desktopSearch}`} onSubmit={handleSearch}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search for products, brands and more"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button type="submit" className={styles.searchBtn} aria-label="Search">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </button>
        </form>

        {/* Right side */}
        <nav className={styles.actions}>
          {/* Mobile search icon */}
          <button className={styles.mobileAction} onClick={() => setSearchOpen(!searchOpen)} aria-label="Toggle search">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </button>

          <Link to="/products" className={styles.navLink}>Products</Link>
          <Link to="/orders" className={styles.navLink}>Orders</Link>

          <Link to="/cart" className={styles.cartBtn} aria-label="Cart">
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <span className={styles.cartLabel}>Cart</span>
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </Link>

          {/* Hamburger (mobile) */}
          <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span className={menuOpen ? styles.barOpen1 : styles.bar} />
            <span className={menuOpen ? styles.barOpen2 : styles.bar} />
            <span className={menuOpen ? styles.barOpen3 : styles.bar} />
          </button>
        </nav>
      </div>

      {/* Mobile Search Bar */}
      {searchOpen && (
        <div className={styles.mobileSearchWrap}>
          <form className={styles.mobileSearchForm} onSubmit={handleSearch}>
            <input
              className={styles.mobileSearchInput}
              type="text"
              placeholder="Search products, brands..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              autoFocus
            />
            <button type="submit" className={styles.searchBtn}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <nav className={styles.mobileMenu}>
          <Link to="/products" className={styles.mobileMenuLink} onClick={() => setMenuOpen(false)}>🛍️ Products</Link>
          <Link to="/orders" className={styles.mobileMenuLink} onClick={() => setMenuOpen(false)}>📦 My Orders</Link>
          <Link to="/cart" className={styles.mobileMenuLink} onClick={() => setMenuOpen(false)}>🛒 Cart {cartCount > 0 && `(${cartCount})`}</Link>
        </nav>
      )}
    </header>
  )
}
