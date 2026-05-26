import styles from './Hero.module.css';

const Hero = () => (
  <>
    {/* Ticker */}
    <div className={styles.tickerWrap}>
      <div className={styles.ticker}>
        {[...Array(2)].map((_, i) => (
          <span key={i} className={styles.tickerInner}>
            <span className={styles.tickerItem}><span className={styles.dot}/>Free shipping on orders above ₹999</span>
            <span className={styles.tickerItem}><span className={styles.dot}/>Summer Sale — Up to 60% OFF</span>
            <span className={styles.tickerItem}><span className={styles.dot}/>New arrivals in Electronics &amp; Fashion</span>
            <span className={styles.tickerItem}><span className={styles.dot}/>Easy 30-day returns</span>
          </span>
        ))}
      </div>
    </div>

    {/* Hero */}
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.text}>
          <div className={styles.badge}>✦ Summer Collection 2025</div>
          <h1>Discover <em>curated</em><br />collections you love</h1>
          <p>Handpicked products across Electronics, Fashion, Home &amp; Books — with unbeatable prices.</p>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}><div className={styles.num}>2.4k+</div><div className={styles.label}>Products</div></div>
          <div className={styles.stat}><div className={styles.num}>98%</div><div className={styles.label}>Happy Customers</div></div>
          <div className={styles.stat}><div className={styles.num}>4.8★</div><div className={styles.label}>Avg. Rating</div></div>
        </div>
      </div>
    </section>
  </>
);

export default Hero;
