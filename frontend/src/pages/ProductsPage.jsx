import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getProducts, getCategories } from '../api/api'
import ProductCard from '../components/ProductCard'
import styles from './ProductsPage.module.css'

const SORTS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'popularity', label: 'Popularity' },
  { value: 'rating', label: 'Rating' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
]

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [filterOpen, setFilterOpen] = useState(false)

  const search = searchParams.get('search') || ''
  const category = searchParams.get('category') || ''
  const sort = searchParams.get('sort') || 'newest'
  const page = parseInt(searchParams.get('page') || '1')

  const setParam = (key, value) => {
    const p = new URLSearchParams(searchParams)
    if (value) p.set(key, value); else p.delete(key)
    if (key !== 'page') p.set('page', '1')
    setSearchParams(p)
  }

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error)
  }, [])

  useEffect(() => {
    setLoading(true)
    getProducts({ search, category, sort, page, limit: 12 })
      .then(d => { setProducts(d.products); setTotal(d.total); setTotalPages(d.totalPages) })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [search, category, sort, page])

  return (
    <div className="page-layout">
      {/* Mobile filter toggle */}
      <button
        className={styles.filterToggle}
        onClick={() => setFilterOpen(o => !o)}
      >
        <span>🔽 {filterOpen ? 'Hide' : 'Show'} Filters {category ? '(active)' : ''}</span>
        {category && <span className={styles.filterCount}>1</span>}
      </button>

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${filterOpen ? styles.sidebarMobileOpen : ''}`}>
        <div className={styles.sideSection}>
          <h3 className={styles.sideTitle}>Filters</h3>
          {category && (
            <button className={styles.clearBtn} onClick={() => setParam('category', '')}>✕ Clear filters</button>
          )}
        </div>
        <div className={styles.sideSection}>
          <h4 className={styles.sideHeading}>CATEGORY</h4>
          <div className={styles.filterList}>
            {categories.map(c => (
              <label key={c.id} className={styles.filterLabel}>
                <input
                  type="radio"
                  name="category"
                  checked={category === c.slug}
                  onChange={() => setParam('category', c.slug)}
                />
                <span>{c.name}</span>
                <span className={styles.count}>{c._count?.products}</span>
              </label>
            ))}
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className={styles.main}>
        {/* Search bar + sort */}
        <div className={styles.toolbar}>
          <p className={styles.resultCount}>
            {total > 0 ? `Showing ${(page-1)*12+1}–${Math.min(page*12,total)} of ${total} results` : ''}
            {search && <span className={styles.searchLabel}> for "<strong>{search}</strong>"</span>}
          </p>
          <select
            className={styles.sortSelect}
            value={sort}
            onChange={e => setParam('sort', e.target.value)}
          >
            {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>

        {loading ? (
          <div className="spinner-wrap"><div className="spinner" /></div>
        ) : products.length === 0 ? (
          <div className={styles.empty}>
            <span style={{fontSize:64}}>🔍</span>
            <p>No products found. Try a different search or filter.</p>
          </div>
        ) : (
          <>
            <div className={styles.grid}>
              {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
            {/* Pagination */}
            {totalPages > 1 && (
              <div className={styles.pagination}>
                <button className="btn btn-outline btn-sm" disabled={page <= 1} onClick={() => setParam('page', page-1)}>← Prev</button>
                {Array.from({ length: totalPages }, (_, i) => i+1).map(p => (
                  <button
                    key={p}
                    className={`btn btn-sm ${p === page ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setParam('page', p)}
                  >{p}</button>
                ))}
                <button className="btn btn-outline btn-sm" disabled={page >= totalPages} onClick={() => setParam('page', page+1)}>Next →</button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
