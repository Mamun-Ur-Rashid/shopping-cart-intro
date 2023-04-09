import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import ProductCard from './Cards/ProductCard';
import { AddToDB } from '../Utilities/fackDB';
import { CartContext, ProductContext } from '../App';
import { toast } from 'react-hot-toast';

const Shop = () => {
    // const productsData = useLoaderData();
    const products = useContext(ProductContext);
    const [cart , setCart] = useContext(CartContext);
    // console.log(products)

    // handle cart added 
    const handleAddedCart = (product) =>{
        let newCart = [];
        const exists = cart.find(existingProduct => existingProduct.id === product.id);
        if(!exists){
            product.quantity = 1;
            newCart = [...cart, product]
        }
        else{
            const rest =cart.filter(existingProduct =>existingProduct.id !== product.id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }
        toast.success('Product Added')
        setCart(newCart)
        AddToDB(product.id);
    }
    return (
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8'>
            {
                products.map(product => <ProductCard key={product.id} 
                product={product}
                handleAddedCart={handleAddedCart}></ProductCard>)
            }
        </div>
    );
};

export default Shop;