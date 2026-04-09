import { CiSearch } from "react-icons/ci";
import "../styles/navbar.css"
import { IoCart } from "react-icons/io5";
function Navbar({ searchTerm, setSearchTerm, onCartClick }) {
    return (
        <nav className='container'>
            <a href="#" className="logo">NO<span>VA</span></a>
            <div className="search-bar">
                <div><CiSearch /></div>
                <input
                    type='text'
                    placeholder='Search products...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <button className="cart" onClick={() => {
                onCartClick();
            }}>
                <div className="cart-symbol"><IoCart /></div>
                Cart
            </button>

        </nav>
    )
}

export default Navbar