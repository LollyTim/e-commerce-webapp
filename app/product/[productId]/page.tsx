import { product } from '@/utils/product';
import React from 'react'
import ProductDetails from './ProductDetails';
import Container from '@/app/components/Container';
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
            </Container>
        </div >

    )
}

export default Product