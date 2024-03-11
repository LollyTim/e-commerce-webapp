"use client"

import { useEffect, useState } from "react"
import Heading from "../components/Heading"
import Input from "../components/inputs/input"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Button from "../components/Button"
import Link from "next/link"
import { AiOutlineGoogle } from "react-icons/ai"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { SafeUser } from "@/types"

interface LoginFormProps {
    currentUser: SafeUser | null
}

const LoginForm: React.FC<LoginFormProps> = ({ currentUser }) => {

    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
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

    }, [currentUser, router])
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        {
            setIsLoading(true)
            signIn("credentials", {
                ...data,
                redirect: false,
            }).then((callback) => {
                setIsLoading(false)

                if (callback?.ok) {
                    router.push("/cart");
                    router.refresh();
                    toast.success("Logged In");
                }

                if (callback?.error) {
                    toast.error(callback.error);
                }
            })
        }
    }

    if (currentUser) {
        return <p className=" text-center">Logged in, Redirecting...</p>
    }

    return (
        <>
            <Heading title="Sign in to Gadg-Store" />
            <hr className=" bg-slate-300  w-full h-px" />
            <Input id="email" label="Email" disabled={isLoading} type="email" register={register} required errors={errors} />
            <Input id="password" label="Password" type="password" disabled={isLoading} register={register} required errors={errors} />
            <Button label={isLoading ? "Loading" : "Login"} onClick={handleSubmit(onSubmit)} />
            <p className=" text-sm">
                Don&apo;t have an account ? <Link className=" underline" href="/register">Sign up</Link> here!
            </p>
            <Button small onClick={() => { signIn("google") }} label="Continue with Google" outline icon={AiOutlineGoogle} />
        </>
    )
}

export default LoginForm