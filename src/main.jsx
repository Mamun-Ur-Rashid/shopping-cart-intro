import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import  { Toaster } from 'react-hot-toast';

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './components/Home'
import Shop from './components/Shop'
import CartItem from './components/Cards/CartItem'
import About from './components/About'
import ErrorPage from './components/ErrorPage'
import Cart from './components/Cart'
import { productsAndCartData } from './components/Loader/CartAndProductLoader'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App></App>,
        errorElement: <ErrorPage></ErrorPage>,
        loader: productsAndCartData,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/shop',
                element: <Shop></Shop>,
                loader: () => fetch('products.json')
            },
            {
                path: '/cart',
                element: <Cart></Cart>,
                // loader: () => fetch('products.json')
                loader: productsAndCartData
            },
            {
                path: '/about',
                element: <About></About>
            }

        ]
    }
])
ReactDOM.createRoot(document.getElementById('root')).render(

    <>
        <Toaster></Toaster>
        <RouterProvider router={router}>
        </RouterProvider>
    </>
)
