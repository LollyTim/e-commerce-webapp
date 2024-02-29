
import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";






type CartContextType = {
    cartTotalQuantity: number
    cartTotalAmount: number,
    cartProducts: CartProductType[] | null
    handleAddProductToCart: (product: CartProductType) => void
    handleRemoveProductFromCart: (product: CartProductType) => void
    handleQuantityCartIncrease: (product: CartProductType) => void
    handleQuantityCartDecrease: (product: CartProductType) => void
    handleClearCart: () => void
}

export const CartContext = createContext<CartContextType | null>(null);


interface Props {
    [propName: string]: any
}

export const CartContextProvider = (props: Props) => {

    const [cartTotalQuantity, setCartTotalQuantity] = useState(0)
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null)

    const [cartTotalAmount, setCartTotalAmount] = useState(0);



    console.log('qty', cartTotalQuantity)
    console.log('amount', cartTotalAmount)

    useEffect(() => {
        const cartItems: any = localStorage.getItem('gadgStoreCartItems')
        const cProducts: CartProductType[] | null = JSON.parse(cartItems)

        setCartProducts(cProducts)
    }, [])

    useEffect(() => {
        const getTotals = () => {
            if (cartProducts) {
                const { total, qty } = cartProducts?.reduce(
                    (acc, item) => {
                        const itemTotal = item.price * item.quantity
                        acc.total += itemTotal
                        acc.qty += item.quantity


                        return acc
                    }, {
                    total: 0,
                    qty: 0
                }
                )
                setCartTotalQuantity(qty)
                setCartTotalAmount(total)
            }
        }
        getTotals()
    }, [cartProducts])

    const handleAddProductToCart = useCallback((product: CartProductType) => {
        setCartProducts((prev) => {
            let updatedCart;

            if (prev) {
                updatedCart = [...prev, product]
            } else {
                updatedCart = [product]
            }
            toast.success("Product added to Cart")
            localStorage.setItem('gadgStoreCartItems', JSON.stringify(updatedCart))
            return updatedCart

        })
    }, [])

    const handleRemoveProductFromCart = useCallback((product: CartProductType) => {
        if (cartProducts) {
            const filteeredProduct = cartProducts.filter((item) => {
                return item.id !== product.id
            })

            setCartProducts(filteeredProduct)
            toast.success("Product removed from Cart")
            localStorage.setItem('gadgStoreCartItems', JSON.stringify(filteeredProduct))

        }
    }, [cartProducts])

    const handleQuantityCartIncrease = useCallback((product: CartProductType) => {
        let updatedCart;

        if (product.quantity === 99) {
            return toast.error("maximum reached")
        }

        if (cartProducts) {
            updatedCart = [...cartProducts]
            const existingIndex = updatedCart.findIndex((item) => item.id === product.id)
            if (existingIndex > -1) {
                updatedCart[existingIndex].quantity = updatedCart[existingIndex].quantity + 1
            }
            setCartProducts(updatedCart)
            localStorage.setItem('gadgStoreCartItems', JSON.stringify(updatedCart))
        }
    }, [cartProducts])
    const handleQuantityCartDecrease = useCallback((product: CartProductType) => {
        // if (product.quantity === 1) {
        //     return
        // }

        let updatedCart;

        if (product.quantity === 1) {
            return toast.error("minimum reached")
        }

        if (cartProducts) {
            updatedCart = [...cartProducts]
            const existingIndex = updatedCart.findIndex((item) => item.id === product.id)
            if (existingIndex > -1) {
                updatedCart[existingIndex].quantity = updatedCart[existingIndex].quantity - 1
            }
            setCartProducts(updatedCart)
            localStorage.setItem('gadgStoreCartItems', JSON.stringify(updatedCart))
        }
    }, [cartProducts])

    const handleClearCart = useCallback(() => {
        setCartProducts(null)
        setCartTotalQuantity(0)
        localStorage.setItem('gadgStoreCartItems', JSON.stringify(null))
    }, [cartProducts])

    const value = {
        cartTotalQuantity,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleQuantityCartIncrease,
        handleQuantityCartDecrease,
        handleClearCart,
        cartTotalAmount

    }

    return <CartContext.Provider value={value} {...props} />
}

export const useCart = () => {
    const context = useContext(CartContext);

    if (context === null) {
        throw new Error("useCart must be used within a CartContextProvider");
    }

    return context;
}