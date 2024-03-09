"use client";

import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import CustomCheckbox from "@/app/components/inputs/CustomCheckbox";
import SelectColor from "@/app/components/inputs/SelectColor";
import TextArea from "@/app/components/inputs/TextArea";
import Input from "@/app/components/inputs/input";
import { caterories } from "@/libs/Categories";
import { colors } from "@/utils/Colors";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

export type ImageType = {
    color: string;
    colorCode: string;
    image: File | null;
};
export type UploadedImageType = {
    color: string;
    colorCode: string;
    image: string;
};

const AddProduceForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState<ImageType[] | null>()
    const [isProductCreated, setIsProductCreated] = useState(false)



    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            description: "",
            category: "",
            images: [],
            brand: "",
            price: "",
            isStock: false,
        },
    });

    useEffect(() => {
        setConstantValue('images', images)
    }, [images])

    useEffect(() => {
        if (isProductCreated) {
            reset()
            setImages(null)
            setIsProductCreated(false)
        }
    }, [isProductCreated])


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log("Product Data:", data)

        //uploading the image to fb

        //saveproduct to mongo db
    }



    // console.log(category)
    const category = watch("category");

    const setConstantValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        });
    };

    const addImageToState = useCallback((value: ImageType) => {
        setImages((prev) => {
            if (!prev) {
                return [value]
            }

            return [...prev, value]
        })
    }, [])
    const removeImageFromState = useCallback((value: ImageType) => {
        setImages((prev) => {
            if (prev) {
                const filteredImages = prev.filter((item) => item.color !== value.color)
                return filteredImages
            }

            return prev
        })
    }, [])


    return (
        <>
            <Heading title="Add Product" center />
            <Input
                id="name"
                label="Name"
                errors={errors}
                register={register}
                disabled={isLoading}
                required
            />
            <Input
                id="price"
                label="Price"
                type="number"
                errors={errors}
                register={register}
                disabled={isLoading}
                required
            />
            <Input
                id="brand"
                label="Brand"
                errors={errors}
                register={register}
                disabled={isLoading}
                required
            />
            <TextArea
                id="description"
                placeholder="Description"
                errors={errors}
                register={register}
                disabled={isLoading}
                required
            />
            <CustomCheckbox
                id="inStock"
                register={register}
                label="This Product is in stock"
            />
            <div className=" w-full font-medium">
                <div className=" mb-2 font-semibold">Select Category</div>
                <div className=" grid grid-col md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto">
                    {caterories.map((item) => {
                        if (item.label === "All") {
                            return null;
                        }
                        return (
                            <div key={item.label} className=" col-span-1">
                                <CategoryInput
                                    onClick={(category) => setConstantValue("category", category)}
                                    label={item.label}
                                    icon={item.icon}
                                    selected={category === item.label}

                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className=" w-full flex flex-col flex-wrap gap-4">
                <div>
                    <div className=" font-bold">
                        {" "}
                        Select the available product colors and uploade their Image.{" "}
                    </div>
                    <div className="text-sm">
                        You must upload an Image for each of your color selected otherwise
                        your color selection will be ignored.
                    </div>
                </div>
                <div className=" grid grid-cols-2 gap-3">
                    {colors.map((item, index) => {
                        return (
                            <>
                                <SelectColor
                                    key={index}
                                    item={item}
                                    addImageToState={addImageToState}
                                    removeImageFromState={removeImageFromState}
                                    isProductCreated={isProductCreated}
                                />

                            </>
                        );
                    })}
                </div>
            </div>
            <Button label={isLoading ? "Loading..." : "Add product "} onClick={handleSubmit(onSubmit)} />
        </>
    );
};

export default AddProduceForm;
