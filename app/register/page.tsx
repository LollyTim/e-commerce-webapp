import React from 'react'
import Container from '../components/Container'
import FormWrap from '../components/FormWrap'
import RegisterForem from './RegisterForem'
import { getCurrentUser } from '@/actions/getCurrentUser'

const Register = async () => {
    const currentUser = await getCurrentUser()
    return (
        <Container>
            <FormWrap>
                <RegisterForem currentUser={currentUser} />

            </FormWrap>
        </Container>
    )
}

export default Register