"use client"

import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/trunkText";
import { Rating } from "@mui/material";
import Image from "next/image"
import { useRouter } from "next/navigation";

interface ProductCardProps {
    data: any
}
const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
    const firstImage = data.images[0];
    const productRating = data.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) / data.reviews.length
    const rouret = useRouter()
    return (
        <div onClick={() => rouret.push(`/product/${data.id}`)} className=" col-span- cursor-pointer border-[1px] border-slate-200 bg-slate-50 rounded-md p-2 translate hover:scale-105 text-center text-sm">
            <div className="flex flex-col ite  w-full gap-1">
                <div className=" aspect-square overflow-hidden relative w-full ">
                    <Image
                        src={data?.images[0]?.image}
                        alt="productImage"
                        width={1000}
                        height={1000}
                        className="w-full h-full object-contain"
                    />
                </div>
                <div className=" mt-4">
                    {truncateText(data.name)}
                </div>
                <div><Rating value={productRating} readOnly /></div>
                <div className="">{data.reviews.length} reviews</div>
                <div>{formatPrice(data.price)}</div>
            </div>
        </div>
    )
}

export default ProductCard