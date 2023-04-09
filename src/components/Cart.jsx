import React, { useContext, useEffect, useState } from 'react';
import { ClearItemFromDB, getStorageData, removeFromDB } from '../Utilities/fackDB';
import { Link, useLoaderData } from 'react-router-dom';
import CartItem from './Cards/CartItem';
import { CartContext } from '../App';
import { toast } from 'react-hot-toast';

const Cart = () => {
    const [cart, setCart] = useContext(CartContext);
    // console.log(cart)

    /***const pData = useLoaderData();
    const [cart, setCart] = useState();
    useEffect( () => {
        const saveCart = getStorageData();
        let newArr = [];
        for (const id in saveCart){
            const foundProduct = pData.find(product => product.id === id);
            if(foundProduct){
                foundProduct.quantity = saveCart[id];
                newArr.push(foundProduct);
            }
        }
        setCart(newArr);
    },[])
    console.log(cart)
    ***/
    let total = 0;
    if (cart.length > 0) {
        for (const product of cart) {
            total = total + product.price * product.quantity
        }
    }
    // remove from shopping cart
    const handleRemoveItem = id =>{
        const remaining = cart.filter(product => product.id !== id);
        setCart(remaining);
        removeFromDB(id);
        toast.error('Remove Prodect')
    }
    // clear item form cart
    const handleClearItemFromBD = () => {
        if(cart.length > 0){
            setCart([]);
            removeFromDB();
            return toast.success('All Items deleted!! 🫶')
        }
        return toast.error('Cart is Empty!! 🔥')
    }
    const orderHandler = () =>{
        if(cart.length > 0){
            setCart([]);
            removeFromDB();
            return toast.success('Order placed!! 🫶')
        }
        return toast.error('Cart is Empty!! 🔥')
    }
    return (
        <div className='flex min-h-screen items-center justify-center bg-gray-100 text-gray-900 mb-8 py-4'>
            <div>
                <h2 className='text-xl font-semibold'>{cart.length ? "Review Cart Items" : "Cart is EMPTY!"}</h2>
                <ul className='flex flex-col divide-y divide-gray-800'>
                    {
                        cart.map(product => <CartItem key={product.id}
                            product={product}
                            handleRemoveItem={handleRemoveItem}></CartItem>)
                    }
                </ul>
                <div className='space-y-1 text-right'>
                    <p>
                        Total Amount: <span className='font-semibold'>{total}$</span>
                    </p>
                    <p className='text-sm text-gray-400'>Not including taxes and shipping costs</p>
                </div>
                <div className='flex justify-end space-x-4'>
                    {cart.length > 0 ? 
                    (<button onClick={handleClearItemFromBD} className='btn-outlined'>Clear Cart</button>
                    ):
                    ( <Link to='/shop'><button className='btn-outlined'>Back to Shop</button></Link>)}
                    <button onClick={orderHandler} className='btn-primary'>Place Order</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
