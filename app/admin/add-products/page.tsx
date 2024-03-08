import Container from '@/app/components/Container'
import FormWrap from '@/app/components/FormWrap'
import React from 'react'
import AddProduceForm from './AddProduceForm'
import { getCurrentUser } from '@/actions/getCurrentUser'
import NullData from '@/app/components/NullData'

const AddProducts = async () => {
    const currentUser = await getCurrentUser()

    if (!currentUser || currentUser.role !== "ADMIN") {
        return <NullData title='Oops Access denied!!' />
    }
    return (
        <div className=' p-8'>
            <Container>
                <FormWrap>
                    <AddProduceForm />
                </FormWrap>
            </Container>
        </div>
    )
}

export default AddProducts