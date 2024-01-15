import React, { createContext, useEffect, useState } from 'react'

export const CartContext = createContext()

export default function CartContextProvider({ children }) {
    
    // const cartStorage = localStorage.getItem('cartItems')

    const [cartItems, setCartItems] = useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [])



    //Agregar
    const addToCart = (item) => {
        const isItemInCart = cartItems.find((int) => int.id === item.id)

        if(isItemInCart){
            setCartItems(
                cartItems.map((cartItem) => 
                cartItem.id === item.id ? {...cartItem, quantity: cartItem.quantity + 1  } : cartItem
                )
            )
        }else{
            setCartItems([...cartItems, {...item, quantity: 1} ])
        }
    }


    //Eliminar
    const removeItem = (item) => {
        const isItemInCart = cartItems.find((int) => int.id === item.id)

        if(isItemInCart.quantity === 1){
            setCartItems(cartItems.filter((int) => int.id !== item.id))
        }else{
            setCartItems(
                cartItems.map((cartItem) => 
                    cartItem.id === item.id ? {...cartItem, quantity: cartItem.quantity - 1  } : cartItem
                )
            )
        }
    }
     
    
    //Vaciar

    const clearCart = () => {
        setCartItems([])
    }
    
    //Total -sumar
    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity)
    }

    //LocalStorage persist data
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems])

    //Get data localStorage
    useEffect(() => {
    const cartEffect = localStorage.getItem('cartItems')
        if(cartEffect){
            setCartItems(JSON.parse(cartEffect))
        }
    }, [])


  return (
    <CartContext.Provider value={{ addToCart, removeItem, clearCart, getCartTotal, cartItems }}>
        { children }
    </CartContext.Provider>
  )
}
