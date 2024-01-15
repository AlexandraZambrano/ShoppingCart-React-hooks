import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../context/CartContext'
import Cart from './Cart'

const API_URL = 'https://dummyjson.com/products'

function Products() {

    const { addToCart, cartItems  } = useContext(CartContext)

    const [product, setProduct] = useState([])
    const [showModal, setShowModal] = useState(false)

    const toggleCart = () => {
        setShowModal(!showModal)
    }

    const getProducts = async() => {
        await fetch(API_URL)
        .then(res => res.json())
        .then(data => setProduct(data.products))
    }

    useEffect(() => {
        getProducts()
    }, [])

    console.log(product)
    console.log(cartItems)


  return (

    <div className='flex flex-col justify-center bg-gray-100'>

        <div className='flex justify-between items-center px-20 py-5'>
            <h1 className='text-2xl uppercase font-bold mt-10 text-center mb-10'>Shop</h1>

            {!showModal && <button onClick={toggleCart} className='px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700'>Cart ({ cartItems.length })</button>}

        </div>

        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10'>
            {
                product.map(int => (
                    <div key={int.id} className='bg-white shadow-md rounded-lg px-10 py-10'>
                        <img src={int.thumbnail} alt={int.title} className='rounded-md h-48'/>

                        <div className='mt-4'>
                            <h1 className='text-lg uppercase font-bold'>{int.title}</h1>
                            <p className='mt-2 text-gray-600 text-sm'>{int.description}</p>
                            <p className='mt-2 text-gray-600'>${int.price}</p>
                        </div>

                        <div className='mt-6 flex justify-between items-center'>
                            <button onClick={() => addToCart(int)} className='px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700'>Add To Cart</button>
                        </div>

                    </div>
                ))
            }
        </div>

        <Cart showModal={showModal} toggle={toggleCart}/>
    </div>
      
  )
}

export default Products
