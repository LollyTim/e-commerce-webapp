"use client"
import { useCart } from "@/hook/useCart"
import { Elements } from "@stripe/react-stripe-js"
import { StripeElementsOptions, loadStripe, } from "@stripe/stripe-js"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import toast from "react-hot-toast"
import CheckoutForm from "./CheckoutForm"
import Button from "../components/Button"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)


const CheckoutClient = () => {
    const { handleSetPaymentIntent, cartProducts, paymentIntent } = useCart()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [clientSecret, setClientSecret] = useState('')
    const [paymentSuccess, setPaymentSuccess] = useState(false)

    const router = useRouter()


    useEffect(() => {
        if (cartProducts) {
            setLoading(true);
            setError(false);

            fetch("/api/intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: cartProducts,
                    payment_intent_id: paymentIntent,
                }),
            })
                .then((res) => {
                    setLoading(false);
                    if (res.status === 401) {
                        return router.push("/login");
                    }
                    console.log(res)
                    return res?.json();
                })
                .then((data) => {
                    setClientSecret(data?.paymentIntent?.client_secret);
                    handleSetPaymentIntent(data?.paymentIntent?.id);
                })
                .catch((error) => {
                    setError(true);
                    console.log("Error", error);
                    toast.error("something went wrong");
                });
        }
    }, [cartProducts, paymentIntent, router, handleSetPaymentIntent]);
    const options: StripeElementsOptions = {
        clientSecret,
        appearance: {
            theme: "stripe",
            labels: "floating"
        }
    }

    function handleSetPaymentSuccess(value: boolean) {
        setPaymentSuccess(value);
    }

    return (
        <div className="w-full">
            {clientSecret && cartProducts && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm
                        clientSecret={clientSecret}
                        handleSetPaymentSuccess={handleSetPaymentSuccess} />
                </Elements>
            )}
            {loading && <div className=" text-center"> Loading Checkout...</div>}
            {error && <div className=" text-center text-rose-500"> Sometning Went Wrong</div>}
            {paymentSuccess && <div className=" flex items-center flex-col gap-4">
                <div className=" text-teal-500 text-center">Payment Success</div>
                <div className=" max-w-[220px] w-full ">
                    <Button label="Vieew your Orders" onClick={() => router.push("/order")} />
                </div>
            </div>}
        </div>
    )
}

export default CheckoutClient