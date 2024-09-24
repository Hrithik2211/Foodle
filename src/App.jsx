import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home'
import ProductDetail from './components/pages/ProductDetail';
import Header from './components/layout/Header'
import Footer from './components/layout/Footer';
import About from './components/pages/About';
import Contact from './components/pages/Contact';

const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:barcode" element={<ProductDetail />} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
