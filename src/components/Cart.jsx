import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'

export default function Cart() {

    const { addToCart, removeItem, clearCart, getCartTotal, cartItems } = useContext(CartContext)

    console.log(cartItems)

  return (
    <div className='flex-col flex items-center bg-white gap-8 p-10 text-black text-sm'>
        <h1 className='text-2xl font-bold"'>Cart</h1>
        <div className='flex flex-col gap-4'>
            {
                cartItems.map((int) => (
                    <div key={int.id} className='flex justify-between items-center'>
                        <div className='flex gap-4'>
                            <img src={int.thumbnail} alt={int.title} className='rounded-md h-24'/>

                            <div className='flex flex-col'>
                                <h1 className='text-lg font-bold'>{int.title}</h1>
                                <p className='text-gray-600'>{int.price}</p>
                            </div>
                        </div>

                        <div className='flex gap-4'>
                            <button onClick={() => addToCart(int)} className='px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700'>+</button>

                            <p>{int.quantity}</p>

                            <button onClick={() => removeItem(int)} className='px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700'>-</button>
                        </div>
                    </div>
                ))
            }
        </div>
        {
        cartItems.length > 0 ? (

          <div className="flex flex-col justify-between items-center">
            <h1 className="text-lg font-bold">Total: ${getCartTotal()}</h1>

            <button onClick={() => clearCart()} className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700">Clear cart</button>
        </div>
          ) : (
            <h1 className="text-lg font-bold">Your cart is empty</h1>
          )
        }

    </div>
  )
}
