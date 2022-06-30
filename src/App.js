import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
import { Navigation } from './Components/Navigation/Navigation';
// React router
import { Route, Routes } from 'react-router-dom';
import { About } from './Components/About/About';
import { Cart } from './Components/Cart/Cart';
import { Home } from './Components/Home/Home';
import React from 'react';
import { ProductPage } from './Components/ProductPage/ProductPage';
import { PageNotFound } from './Components/404/PageNotFound';

export function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/products/:productId' element={<ProductPage />} />
          <Route path='*' element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
}
