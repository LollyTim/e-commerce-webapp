"use client"


import { useCart } from "@/hook/useCart"
import Link from "next/link"
import { MdArrowBack } from "react-icons/md"
import Heading from "../components/Heading"
import Button from "../components/Button"
import ItemContent from "./ItemContent"


const CartClient = () => {
    const { cartProducts, handleClearCart } = useCart()
    if (!cartProducts || cartProducts.length === 0) {
        return (
            <div className="flex flex-col items-center ">
                <div className="text-2xl">Your cart is empty</div>
                <Link href={"/"} className=" text-slate-500 text-center flex items-center f;ex gap-1 mt-2">
                    <MdArrowBack />
                    <span>Start shopping</span>
                </Link>

            </div>)

    }
    return (
        <div className="">
            <Heading center title="Shopping Cart" />
            <div className=" mt-8 grid grid-cols-5 gap-4 text-xs pb-2 items-center">
                <div className=" col-span-2 justify-self-start">PRODUCT</div>
                <div className=" justify-self-center">PRICE</div>
                <div className=" justify-self-center">Quantity</div>
                <div>TOTAL</div>
            </div>
            <div>
                {cartProducts && cartProducts.map((each) => {
                    return (
                        <ItemContent key={each.id} each={each} />
                    )
                })}
            </div>
            <div className=" border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4 ">

                <div className=" w-[90px]">
                    <Button label="Clear cart" small outline onClick={() => handleClearCart()} />
                </div>
                <div className=" text-sm flex flex-col gap-1 items-start">

                    <div className="flex justify-between w-full text-base font-semibold">
                        <span>Subtotal</span>
                        <span>$1,000</span>
                    </div>
                    <p className=" text-slate-500">Taxes and shipping calculated at checkout</p>
                    <Button label="Checkout" onClick={() => { }} />
                    <Link href={"/"} className=" text-slate-500 text-center flex items-center f;ex gap-1 mt-2">
                        <MdArrowBack />
                        <span>Continue shopping</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CartClient 