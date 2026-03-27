import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.grid}>
          <div>
            <h4>ABOUT</h4>
            <ul>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </div>
          <div>
            <h4>HELP</h4>
            <ul>
              <li><a href="#">Payments</a></li>
              <li><a href="#">Shipping</a></li>
              <li><a href="#">Cancellation & Returns</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4>POLICY</h4>
            <ul>
              <li><a href="#">Return Policy</a></li>
              <li><a href="#">Terms of Use</a></li>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Sitemap</a></li>
            </ul>
          </div>
          <div>
            <h4>SOCIAL</h4>
            <ul>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">YouTube</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <span>© 2024 Flipkart Clone — Built for SDE Intern Assignment</span>
        <span>🇮🇳 India</span>
      </div>
    </footer>
  )
}
