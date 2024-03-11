"use client"

import { useCart } from "@/hook/useCart"
import { formatPrice } from "@/utils/formatPrice"
import { AddressElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import Heading from "../components/Heading"
import Button from "../components/Button"

interface CheckoutFormProps {
    clientSecret: string
    handleSetPaymentSuccess: (value: boolean) => void
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ handleSetPaymentSuccess, clientSecret }) => {
    const { cartTotalAmount, handleClearCart, handleSetPaymentIntent } = useCart()
    const stripe = useStripe()
    const elements = useElements()
    const [isloading, setIsLoaging] = useState(false)
    const formattedPrice = formatPrice(cartTotalAmount)

    useEffect(() => {
        if (!stripe) {
            return
        }
        if (!clientSecret) {
            return
        }
        handleSetPaymentSuccess(false)
    }, [stripe, handleSetPaymentSuccess, clientSecret])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return
        }
        setIsLoaging(true)

        stripe.confirmPayment({
            elements, redirect: "if_required"
        }).then(result => {
            if (!result.error) {
                toast.success("Payment Seccessful")
                handleClearCart()
                handleSetPaymentSuccess(true)
                handleSetPaymentIntent(null)
            }
            setIsLoaging(false)

        })
    }

    return (
        <form onSubmit={handleSubmit} id="payment-form">
            <div className=" mb-6">
                <Heading title="Enter you details to complete chaekout" />
            </div>
            <h2 className=" font-semibold mb-2 ">Payment Information</h2>
            <AddressElement options={{ mode: "shipping", allowedCountries: ["US", "NG"] }} />
            <h2 className=" font-semibold mt-4 mb-2 ">Payment Information</h2>
            <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
            <div className="py-4 text-center text-3xl text-slate-500 font-bold">
                Total: {formattedPrice}
            </div>
            <Button onClick={() => { }} label={isloading ? "Processing" : "Pay Now"} disabled={isloading || !stripe || !elements} />

        </form>
    )
}

export default CheckoutForm