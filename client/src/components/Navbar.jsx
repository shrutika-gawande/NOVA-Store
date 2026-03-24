import React from 'react'
import "../styles/navbar.css"
import { IoCart } from "react-icons/io5";
function Navbar() {
    return (
        <nav className='container'>
            <a href="#" class="logo">NO<span>VA</span></a>
            <input
                type='text'
                placeholder='🔍︎   Search products...'
                className="search-bar"
            />
            <button className="cart">
                <div className="cart-symbol"><IoCart /></div>
                Cart
            </button>

        </nav>
    )
}

export default Navbar