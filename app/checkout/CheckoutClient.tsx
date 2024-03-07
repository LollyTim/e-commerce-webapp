"use client"
import { useCart } from "@/hook/useCart"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"


const CheckoutClient = () => {
    const { handleSetPaymentIntent, cartProducts, paymentIntent } = useCart()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [clientSecret, setClientSecret] = useState('')
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
    }, [cartProducts, paymentIntent]);

    return (
        <div>Checkout</div>
    )
}

export default CheckoutClient