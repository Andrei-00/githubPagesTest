import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import { CartProvider } from './context/cartContext';
import { ProductProvider } from './context/productContext';

function App() {
  const [cart, setCart] = useState<any[]>([]);

  

  return (
    <Router>
      <div className="App">
        <CartProvider>
        <ProductProvider>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          {}
          
          <Route path='/products' element={<Products />  } />
       
          <Route path="/cart" element={
            <Cart
            />
          } />
        </Routes>
        </ProductProvider>
        </CartProvider>
      </div>
    </Router>
  );
};

export default App;