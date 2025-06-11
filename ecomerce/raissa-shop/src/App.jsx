import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'; 
import { store } from './redux/store'; 
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";

import Ajout from "./pages/Ajout";

function App() {
  return (
    <Provider store={store}>  
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/ajout" element={<Ajout />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
