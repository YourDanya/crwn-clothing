import React, {createContext, useState, useEffect} from "react";

import {addItemToCart, calcTotal, removeItemFromCart, filterItemFromCart, getCartItemsCount} from "./cart.utils";

export const CartContext= createContext({
    hidden: true,
    toggleHidden: ()=> {},
    cartItems: [],
    addItem: ()=>{},
    removeItem: () => {},
    clearItemFromCart: ()=>{},
    cartItemsCount: 0,
    total: 0
})

const CartProvider= ({children}) =>{
    const [hidden, setHidden] = useState(true)
    const [cartItems, setCartItems]= useState([])
    const [cartItemsCount, setCartItemsCount]= useState(0)
    const [total, setTotal]= useState(0)
    const addItem = item=> {
        setCartItems(addItemToCart(cartItems, item))
    }
    const removeItem = item=> {
        setCartItems(removeItemFromCart(cartItems, item))

    }
    useEffect(()=>{
        setCartItemsCount(getCartItemsCount(cartItems))
    }, [cartItems])

    useEffect(()=>{
        setTotal(calcTotal(cartItems))
    }, [cartItems])

    const toggleHidden= () => setHidden(!hidden)

    const clearItemFromCart= item => setCartItems(filterItemFromCart(cartItems, item))

    return (
        <CartContext.Provider value={{
            hidden,
            toggleHidden,
            cartItems,
            addItem,
            removeItem,
            cartItemsCount,
            total,
            clearItemFromCart
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider


