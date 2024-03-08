"use client"

import Heading from "@/app/components/Heading"
import TextArea from "@/app/components/inputs/TextArea"
import Input from "@/app/components/inputs/input"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
// import { Input } from "@mui/material"

const AddProduceForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            description: "",
            category: "",
            images: [],
            brand: "",
            price: '',
            isStock: false,
        }
    })

    return (
        <>
            <Heading title="Add Product" center />
            <Input id="name" label="Name" errors={errors} register={register} disabled={isLoading} required />
            <Input id="price" label="Price" type="number" errors={errors} register={register} disabled={isLoading} required />
            <Input id="brand" label="Brand" errors={errors} register={register} disabled={isLoading} required />
            <TextArea id="description" placeholder="Description" errors={errors} register={register} disabled={isLoading} required />
            <div>

            </div>
        </>
    )
}

export default AddProduceForm