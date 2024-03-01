"use client"

import { useState } from "react"
import Heading from "../components/Heading"
import Input from "../components/inputs/input"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Button from "../components/Button"
import Link from "next/link"
import { AiOutlineGoogle } from "react-icons/ai"



const RegisterForem = () => {

    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: "",
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
            <Heading title="Sign up for Gadg-store" />
            <hr className=" bg-slate-300  w-full h-px" />
            <Input id="name" label="Name" disabled={isLoading} register={register} required errors={errors} />
            <Input id="email" label="Email" disabled={isLoading} type="email" register={register} required errors={errors} />
            <Input id="password" label="Password" type="password" disabled={isLoading} register={register} required errors={errors} />
            <Button label={isLoading ? "Loading" : "Signup"} onClick={handleSubmit(onSubmit)} />
            <p className=" text-sm">
                Already have an account? <Link className=" underline" href="/login">Login</Link> here!
            </p>
            <Button onClick={() => { }} label="Signup with Google" outline icon={AiOutlineGoogle} />
        </>
    )
}

export default RegisterForem