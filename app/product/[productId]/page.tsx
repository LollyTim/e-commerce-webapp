import { product } from '@/utils/product';
import React from 'react'
import ProductDetails from './ProductDetails';
import Container from '@/app/components/Container';
import ListRating from './ListRating';
interface IParams {
    product: string
}
const Product = ({ params }: { params: IParams }) => {
    console.log("params: ", params);
    product
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