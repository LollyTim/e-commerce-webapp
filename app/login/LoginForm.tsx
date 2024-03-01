"use client"

import { useState } from "react"
import Heading from "../components/Heading"
import Input from "../components/inputs/input"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Button from "../components/Button"
import Link from "next/link"
import { AiOutlineGoogle } from "react-icons/ai"



const LoginForm = () => {

    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        {
            setIsLoading(true)
            console.log(data)
        }
    }

    return (
        <>
            <Heading title="Sign in to Gadg-Store" />
            <hr className=" bg-slate-300  w-full h-px" />
            <Input id="email" label="Email" disabled={isLoading} type="email" register={register} required errors={errors} />
            <Input id="password" label="Password" type="password" disabled={isLoading} register={register} required errors={errors} />
            <Button label={isLoading ? "Loading" : "Login"} onClick={handleSubmit(onSubmit)} />
            <p className=" text-sm">
                Don't have an account ? <Link className=" underline" href="/register">Sign up</Link> here!
            </p>
            <Button small onClick={() => { }} label="Continue with Google" outline icon={AiOutlineGoogle} />
        </>
    )
}

export default LoginForm