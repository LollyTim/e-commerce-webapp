"use strict";
import React from 'react';
import { getCurrentUser } from '@/actions/getCurrentUser';
import NullData from '@/app/components/NullData';
import Container from '@/app/components/Container';
import OrderClient from './OrderClient';
import getOrderByUserId from '@/actions/getOrdersById';

const Orders = async () => {

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return <NullData title="Oops! Access Denied" />;
    }


    const orders = await getOrderByUserId(currentUser.id)
    if (!orders) {
        return <NullData title="Placed No Order" />;
    }
    return (
        <div className="p-8 bg-white text-[#0F1111] select-none ">
            <Container>
                <OrderClient orders={orders} />
            </Container>
        </div>
    );
};

export default Orders;