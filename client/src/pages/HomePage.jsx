import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Products from "../components/Products"
import CartDrawer from "../components/CartDrawer"
import { useState } from "react"
import products from "../seed.js"


function HomePage() {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [maxPrice, setMaxPrice] = useState(5000);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [minRating, setMinRating] = useState(0)
    const [sortOption, setSortOption] = useState("default");

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())

        const matchesPrice = product.price <= maxPrice

        const matchesCategory =
            selectedCategory === "All" ||
            product.cat === selectedCategory

        const matchesRating =
            product.rating >= minRating

        return matchesSearch && matchesPrice && matchesCategory && matchesRating
    })

    let sortedProducts = [...filteredProducts];
    switch (sortOption) {
        case "low-high":
            sortedProducts.sort((a, b) => a.price - b.price)
            break
        case "high-low":
            sortedProducts.sort((a, b) => b.price - a.price)
            break
        case "rating":
            sortedProducts.sort((a, b) => b.rating - a.rating)
            break
        default:
            break
    }

    const handleReset = () => {
        setSearchTerm("")
        setSelectedCategory("All")
        setMaxPrice(5000)
        setSortOption("default")
        setMinRating(0)
    }
    const openCart = () => {
        setIsCartOpen(true);
    };

    const closeCart = () => {
        setIsCartOpen(false);
    };

    return (
        <div>
            <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onCartClick={openCart} />
            <CartDrawer
                isOpen={isCartOpen}
                onClose={closeCart}
            />
            <Hero />
            <Products products={sortedProducts}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                minRating={minRating}
                setMinRating={setMinRating}
                sortOption={sortOption}
                setSortOption={setSortOption}
                onReset={handleReset}
            />
            <Footer />
        </div>
    )
}

export default HomePage