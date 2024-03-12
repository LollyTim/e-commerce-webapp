'use client';

import { Order, User } from '@prisma/client';
import React, { useCallback } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {
    MdAccessTimeFilled,
    MdDeliveryDining,
    MdDone,
    MdDoneAll,
    MdRemoveRedEye,
} from 'react-icons/md';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { formatPrice } from '@/utils/formatPrice';
import Heading from '@/app/components/Heading';
import ActionBtn from '@/app/components/ActiomBtn';
import Status from '@/app/components/Status';
import moment from 'moment';


interface OrderClientProps {
    orders: ExtendedOrder[] | undefined;
}

type ExtendedOrder = Order & {
    user: User
}

const OrderClient: React.FC<OrderClientProps> = ({
    orders,
}) => {
    const router = useRouter();
    let rows: any = [];

    if (orders) {
        rows = orders.map((order) => {
            return {
                id: order.id,
                customer: order.user.name,
                amount: formatPrice(order.amount / 100),
                paymentStatus: order.status,
                date: moment(order.createdDate).fromNow(),
                deliveryStatus: order.deliveryStatus,
            };
        });
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 140 },
        { field: 'customer', headerName: 'Customer Name', width: 140 },
        {
            field: 'amount',
            headerName: 'Amount(USD)',
            width: 140,
            renderCell: (params) => {
                return (
                    <div className=" font-bold text-slate-800">{params.row.amount}</div>
                );
            },
        },

        {
            field: 'paymentStatus',
            headerName: 'Payment Status',
            width: 140,
            renderCell: (params) => {
                return (
                    <div>
                        {params.row.paymentStatus === "pending" ? (
                            <Status
                                text="pending"
                                icon={MdAccessTimeFilled}
                                bg="bg-slate-200"
                                color="text-slate-700"
                            />
                        ) : params.row.paymentStatus === "complete" ? (
                            <Status
                                text="completed"
                                icon={MdDone}
                                bg="bg-green-200"
                                color="text-green-700"
                            />
                        ) : <></>}
                    </div>
                );
            },
        },
        {
            field: 'deliveryStatus',
            headerName: 'Delivery Status',
            width: 140,
            renderCell: (params) => {
                return (
                    <div>
                        {params.row.deliveryStatus === "pending" ? (
                            <Status
                                text="pending"
                                icon={MdAccessTimeFilled}
                                bg="bg-slate-200"
                                color="text-slate-700"
                            />
                        ) : params.row.deliveryStatus === "dispatched" ? (
                            <Status
                                text="dispatched"
                                icon={MdDeliveryDining}
                                bg="bg-purple-200"
                                color="text-purple-700"
                            />
                        ) : params.row.deliveryStatus === "delivered" ?
                            <Status
                                text="delivered"
                                icon={MdDoneAll}
                                bg="bg-green-200"
                                color="text-green-700"
                            /> : <></>}
                    </div>
                );
            },
        },
        { field: "date", headerName: "Date", width: 140 },
        {
            field: 'action',
            headerName: 'Actions',
            width: 100,
            renderCell: (params) => {
                return (
                    <div className="flex justify-between gap-2 w-full">

                        <ActionBtn
                            icon={MdRemoveRedEye}
                            onClick={() => {
                                router.push(`/order/${params.row.id}`);
                            }}
                        />
                    </div>
                );
            },
        },
    ];




    return (
        <div className=" max-w-[1000px] mx-auto text-xl">
            <div className=" mb-4 mt-8">
                <Heading title="Manange Orders" />
            </div>

            <div style={{ height: 600, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 9 },
                        },
                    }}
                    pageSizeOptions={[9, 20]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </div>
        </div>
    );
};

export default OrderClient;