import "../styles/hero.css"

function Hero() {
  return (
    <div className='hero'>
      <div className="hero-inner">
        <div className="hero-badge">✦ Summer Collection {new Date().getFullYear()}</div>
        <div className="heading">
          <h1>Discover <em>curated</em><br />collections you love</h1>
          <p>Handpicked products across Electronics, Fashion, Home & Books — with unbeatable prices.</p>
        </div>
      </div>

      <div className="hero-stats">
        <div className="stat"><div className="num">2.4k+</div><div className="label">Products</div></div>
        <div className="stat"><div className="num">98%</div><div className="label">Happy Customers</div></div>
        <div className="stat"><div className="num">4.8★</div><div className="label">Avg. Rating</div></div>
      </div>

    </div>
  )
}

export default Hero