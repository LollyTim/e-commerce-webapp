"use client"

import { CartProductType } from "@/app/product/[productId]/ProductDetails"

interface SetQuantityProps {
    cartCounter?: boolean,
    cartProduct: CartProductType,
    handleQuantityIncreace: () => void
    handleQuantityDecreace: () => void

}

const SetQuantity: React.FC<SetQuantityProps> = ({ cartProduct, cartCounter, handleQuantityDecreace, handleQuantityIncreace }) => {
    return (
        <div className=" flex items-center gap-8">
            {cartCounter ? null : <div className="font-semibild">
                QUANTITY:
            </div>}
            <div className="flex gap-4 items-center text-base">
                <button className=" border-[1.2px] border-slate-300 px-2 rounded" onClick={handleQuantityDecreace}>-</button>
                <div>{cartProduct.quantity}</div>
                <button className=" border-[1.2px] border-slate-300 px-2 rounded" onClick={handleQuantityIncreace}>+</button>
            </div>
        </div>
    )
}

export default SetQuantity
