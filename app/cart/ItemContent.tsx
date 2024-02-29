"use client"
import { formatPrice } from '@/utils/formatPrice'
import { CartProductType } from '../product/[productId]/ProductDetails'
import Link from 'next/link'
import { truncateText } from '@/utils/trunkText'
import Button from '../components/Button'
import Image from 'next/image'
import SetQuantity from '../components/products/setQuantity'
import { useCart } from '@/hook/useCart'

interface ItemContentProp {
    each: CartProductType
}

const ItemContent: React.FC<ItemContentProp> = ({ each }) => {
    const { handleRemoveProductFromCart } = useCart()
    const { handleQuantityCartDecrease } = useCart()
    const { handleQuantityCartIncrease } = useCart()
    return (
        <div className=' grid grid-cols-5 text-xs md:text-sm gap-6 border-t-[1.5px] border-slate-200 py-4 items-center '>
            <div className=' col-span-2 justify-self-start flex gap-2 md:gap-4'>
                <Link href={`/product/${each.id}`}>
                    <div className=' relative aspect-square w-[60px] max-w-[70px] '>
                        <Image
                            unoptimized
                            src={each.selectedImg.image}
                            alt={each.name}
                            fill
                            className='' />
                    </div>
                </Link>
                <div className=' flex flex-col justify-between'>
                    <Link href={`/product/${each.id}`}>
                        {truncateText(each.name)}
                    </Link>
                    <div>{each.selectedImg.color}</div>
                    <div className=' w-[70px] '>
                        <button onClick={() => handleRemoveProductFromCart(each)} className=' text-slate-500 underline'>
                            Remove
                        </button>
                    </div>
                </div>
            </div>
            <div className=" justify-self-center">{formatPrice(each.price)}</div>
            <div className=" justify-self-center">
                <SetQuantity
                    cartCounter={true}
                    cartProduct={each}
                    handleQuantityIncreace={() => { handleQuantityCartIncrease(each) }}
                    handleQuantityDecreace={() => { handleQuantityCartDecrease(each) }} />
            </div>
            <div className=" justify-self-end font-semibold">
                {formatPrice(each.price * each.quantity)}
            </div>
        </div>
    )
}

export default ItemContent