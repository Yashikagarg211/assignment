import { useState } from 'react'
import styles from './ImageCarousel.module.css'

export default function ImageCarousel({ images }) {
  const [active, setActive] = useState(0)
  if (!images || images.length === 0) return (
    <div className={styles.placeholder}>
      <img src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500" alt="Product" className={styles.mainImg} />
    </div>
  )

  return (
    <div className={styles.carousel}>
      <div className={styles.thumbs}>
        {images.map((img, i) => (
          <button key={i} className={`${styles.thumb} ${i === active ? styles.activeThumb : ''}`} onClick={() => setActive(i)}>
            <img src={img.url} alt={`Product ${i+1}`} />
          </button>
        ))}
      </div>
      <div className={styles.mainWrap}>
        <img src={images[active].url} alt="Product" className={styles.mainImg} />
        <div className={styles.nav}>
          <button className={styles.navBtn} onClick={() => setActive(i => Math.max(0, i-1))} disabled={active === 0}>‹</button>
          <button className={styles.navBtn} onClick={() => setActive(i => Math.min(images.length-1, i+1))} disabled={active === images.length-1}>›</button>
        </div>
      </div>
    </div>
  )
}
