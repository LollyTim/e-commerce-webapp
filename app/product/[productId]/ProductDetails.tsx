"use client";

import Button from "@/app/components/Button";
import ProductImage from "@/app/components/products/ProductImage";
import SelectColor from "@/app/components/products/SelectColor";
import SetQuantity from "@/app/components/products/setQuantity";
import { useCart } from "@/hook/useCart";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";

interface ProductDetailsProps {
    product: any

}

export type CartProductType = {

    id: string,
    name: string,
    description: string,
    category: string,
    brand: string,
    selectedImg: SelectedImgType,
    quantity: number,
    price: number

}

export type SelectedImgType = {
    color: string,
    colorCode: string,
    image: string
}


const Hanorizontal = () => { return <hr className=" w-[30%] my-2 " /> }

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {

    const { handleAddProductToCart, cartProducts } = useCart()

    const [isProductInCart, setIsProductInCart] = useState(false)

    const productRating = product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) / product.reviews.length
    const [cartProduct, setCartProduct] = useState<CartProductType>({
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        brand: product.brand,
        selectedImg: { ...product.images[0] },
        quantity: 1,
        price: product.price,
    })
    const router = useRouter()


    console.log(cartProducts)

    useEffect(() => {
        setIsProductInCart(false)

        if (cartProducts) {
            const existingIndex = cartProducts.findIndex((item) => item.id === product.id)
            if (existingIndex > -1) {
                setIsProductInCart(true)
            }
        }
    }, [cartProducts])

    const handleColoSelect = useCallback(
        (value: SelectedImgType) => {
            setCartProduct((prev) => {
                return {
                    ...prev, selectedImg: value
                }
            })
        }, [cartProduct.selectedImg])

    const handleQuantityIncreace = useCallback(() => {
        if (cartProduct.quantity == 99) {
            return
        }
        setCartProduct((prev) => {
            return {
                ...prev, quantity: prev.quantity + 1
            }
        })
    }, [cartProduct])
    const handleQuantityDecreace = useCallback(() => {
        if (cartProduct.quantity == 1) {
            return
        }
        setCartProduct((prev) => {
            return {
                ...prev, quantity: prev.quantity - 1
            }
        })
    }, [cartProduct])
    return (

        <div className=" grid grid-cols-1 md:grid-cols-2 gap-12">
            <ProductImage cartProduct={cartProduct} product={product} handleColorSelect={handleColoSelect} />
            <div className=" flex flex-col gap-1 taxt-slate-500">
                <h2 className=" text-3xl font-medium text-slate-700">{product.name}</h2>
                <div className="flex items-center gap-2  ">
                    <Rating value={productRating} readOnly />
                    <div>{product.reviews.length} reviews</div>
                </div>
                <Hanorizontal />
                <div className=" text-justify">{product.description}</div>
                <div>
                    <span className=" font-semibold">CATEGORIES:</span>
                    <span>{product.category}</span>
                </div>
                <div>
                    <span className=" font-semibold">BRAND:</span>
                    <span>{product.brand}</span>
                </div>
                <div className={product.inStock ? "text-teal-600" : "text-rose-500"}>{product.inStock ? "InStock" : "Out of stock"} </div>
                <Hanorizontal />
                {/* <div>color</div> */}
                {isProductInCart ?
                    <>
                        <p className=" mb-2 text-slate-500 flex items-center gap-1">
                            <MdCheckCircle size={20} className=" text-teal-400" />
                            <span>Product added to cart</span>
                        </p>
                        <div className="max-x-[300px]" >
                            <Button label="Vier Cart" outline onClick={() => {
                                router.push('/cart')
                            }} />
                        </div>
                    </> : <><SelectColor cartProduct={cartProduct} handleColorSelect={handleColoSelect} images={product.images} />
                        <Hanorizontal />
                        <SetQuantity cartProduct={cartProduct} handleQuantityIncreace={handleQuantityIncreace} handleQuantityDecreace={handleQuantityDecreace} />
                        <Hanorizontal />
                        <div className=" max-w-[300px]">
                            <Button custom={false} label="Add to Cart" onClick={() => handleAddProductToCart(cartProduct)} />
                        </div></>}

            </div>
        </div>
    )
}

export default ProductDetails