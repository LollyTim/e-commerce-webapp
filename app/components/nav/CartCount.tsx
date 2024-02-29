"use client"


import { useCart } from '@/hook/useCart'
import { useRouter } from 'next/navigation'
import { CiShoppingCart } from "react-icons/ci"
import React from 'react'

const CartCount = () => {
    const { cartTotalQuantity } = useCart()

    const router = useRouter()
    return (
        <div className=' cursor-pointer relative' onClick={() => router.push("/cart")}>
            <div className='text-3xl'>
                <CiShoppingCart color='white' />
            </div>
            <span className={`${cartTotalQuantity < 1 ? "hidden" : 'absolute top-[-10px] right-[-10px] bg-red-400 text-white h-6 w-6 rounded-full flex items-center justify-center text-sm '}`}>
                {cartTotalQuantity}
            </span>
        </div>
    )
}

export default CartCount