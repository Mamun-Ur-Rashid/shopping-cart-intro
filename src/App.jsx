import React, { createContext, useState } from 'react';
import Home from './components/Home';
import Header from './components/Header';
import { Outlet, useLoaderData } from 'react-router-dom';
import Footer from './components/Footer';
export const ProductContext = createContext([]);
export const CartContext = createContext([]);
const App = () => {
  const { cartArray, products } = useLoaderData();
  const [cart, setCart] = useState(cartArray);
  return (
    <ProductContext.Provider value={products}>
      <CartContext.Provider value={[cart, setCart]}>
        <div>
          <Header></Header>
          <div className='min-h[calc(100vh-137px)]'>
            <Outlet></Outlet>
          </div>
          <Footer></Footer>
        </div>
      </CartContext.Provider>
    </ProductContext.Provider>
  );
};

export default App;