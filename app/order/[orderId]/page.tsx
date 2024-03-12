import React from 'react'
import Container from '@/app/components/Container';
import OrderDetails from './OrderDetails';
import getOrderById from '@/actions/getOrderById';
import NullData from '@/app/components/NullData';


interface IParams {
    order: string
    orderId?: string
}
const Order = async ({ params }: { params: IParams }) => {

    const order = await getOrderById(params)
    if (!order) return <NullData title='No Order Data' />
    return (
        < div className='p-8' >
            <Container>
                <OrderDetails order={order} />
            </Container>
        </div >

    )
}

export default Order