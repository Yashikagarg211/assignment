export default function StarRating({ rating, count, size = 'sm' }) {
  const r = parseFloat(rating) || 0
  const pct = (r / 5) * 100
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      <div style={{ position: 'relative', display: 'inline-block', fontSize: size === 'lg' ? 20 : 14 }}>
        <span style={{ color: '#ddd', letterSpacing: 2 }}>★★★★★</span>
        <span style={{ position: 'absolute', top: 0, left: 0, width: `${pct}%`, overflow: 'hidden', color: '#ff9f00', letterSpacing: 2 }}>★★★★★</span>
      </div>
      {count !== undefined && (
        <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>({count?.toLocaleString()})</span>
      )}
    </div>
  )
}
