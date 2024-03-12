"use strict";
import React from 'react';

// import getProducts from '@/actions/getProduct';
import { getCurrentUser } from '@/actions/getCurrentUser';
import NullData from '@/app/components/NullData';
import ManageOrdersClient from './ManageOrdersClient';
import Container from '@/app/components/Container';
import getOrder from '@/actions/getOrders';

const ManageOrders = async () => {
    const orders = await getOrder();
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== 'ADMIN') {
        return <NullData title="Oops! Access Denied" />;
    }

    return (
        <div className="p-8 bg-white text-[#0F1111] select-none ">
            <Container>
                <ManageOrdersClient orders={orders} />
            </Container>
        </div>
    );
};

export default ManageOrders;