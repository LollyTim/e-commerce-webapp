"use client"

import { useEffect, useState } from "react"
import Heading from "../components/Heading"
import Input from "../components/inputs/input"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Button from "../components/Button"
import Link from "next/link"
import { AiOutlineGoogle } from "react-icons/ai"
import axios from "axios"
import toast from "react-hot-toast"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { SafeUser } from "@/types"

interface RegisterFormProps {
    currentUser: SafeUser | null
}

const RegisterForem: React.FC<RegisterFormProps> = ({ currentUser }) => {

    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })
    const router = useRouter()
    useEffect(() => {
        if (currentUser) {
            router.push("/cart")
            router.refresh()
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        axios
            .post("/api/register", data)
            .then(() => {
                toast.success("Account created successfully");
                signIn("credentials", {
                    email: data.email,
                    password: data.password,
                    redirect: false,
                }).then((callback) => {
                    if (callback?.ok) {
                        router.push("/cart");
                        router.refresh();
                        toast.success("Logged In");
                    }

                    if (callback?.error) {
                        toast.error(callback.error);
                    }
                });
            })
            .catch(() => {
                toast.error("Something went wrong");
            })
            .finally(() => {
                setIsLoading(false);
            });

    }
    if (currentUser) {
        return <p className=" text-center justify-center">Registerted, Redirecting...</p>
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
            <Button onClick={() => { signIn("google") }} small label="Signup with Google" outline icon={AiOutlineGoogle} />
        </>
    )
}

export default RegisterForem