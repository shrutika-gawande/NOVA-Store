import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from "./pages/HomePage"

function App() {
  return (
    <BrowserRouter>

      <CartProvider>
        <Routes>
          
          <Route path="/" element={<HomePage />} />

          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
        <Toaster position="bottom-right" />
      </CartProvider>
    </BrowserRouter>

  );
}

export default App
