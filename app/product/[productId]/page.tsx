import { product } from '@/utils/product';
import React from 'react'
import ProductDetails from './ProductDetails';
import Container from '@/app/components/Container';
import ListRating from './ListRating';
import { products } from '@/utils/products';
import getProductById from '@/actions/getProductById';
import NullData from '@/app/components/NullData';
interface IParams {
    product: string
    productId?: string
}
const Product = async ({ params }: { params: IParams }) => {
    const product = await getProductById(params)
    if (!product) return <NullData title='Oops! Product with the given ID does not exist' />

    return (
        < div className='p-8' >
            <Container>
                <ProductDetails product={product} />
                <div className=' flex flex-col mt-20 gap-20'>
                    <div>Add Rating</div>
                    <ListRating product={product} />
                </div>
            </Container>
        </div >

    )
}

export default Product