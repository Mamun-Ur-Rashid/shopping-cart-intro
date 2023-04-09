import { getStorageData } from "../../Utilities/fackDB"

export const productsAndCartData = async () =>{
    const productsData = await fetch('products.json')
    const products = await productsData.json()
    const savedCart = getStorageData();
    let cartArray = [];
    for (const id in savedCart){
        const foundProduct = products.find(product => product.id === id);
        if(foundProduct){
            foundProduct.quantity = savedCart[id];
            cartArray.push(foundProduct);
        }
    } 
    // console.log(cartArray)
    return {cartArray, products}
}