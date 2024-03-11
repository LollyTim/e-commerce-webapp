// import { ImageType } from ""
import { useCallback, useEffect, useState } from "react";
import SelectImage from "./SelectImage";
import Button from "../Button";
import { ImageType } from "@/app/admin/add-products/AddProduceForm";

interface SelectColorProps {
    item: ImageType;
    addImageToState: (value: ImageType) => void;
    removeImageFromState: (value: ImageType) => void;
    isProductCreated: boolean;
}

const SelectColor: React.FC<SelectColorProps> = ({
    item,
    addImageToState,
    removeImageFromState,
    isProductCreated,
}) => {
    const [isSelected, setIsSeleceed] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        if (isProductCreated) {
            setIsSeleceed(false);
            setFile(null);
        }
    }, [isProductCreated]);

    const handleFileChange = useCallback((value: File) => {
        setFile(value);
        addImageToState({ ...item, image: value });
    }, [addImageToState, item]);

    const handleCheck = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setIsSeleceed(e.target.checked);

        if (!e.target.checked) {
            setFile(null);
            removeImageFromState(item);
        }
    }, [removeImageFromState, item]);

    return (
        <div className=" grid grid-col-1 md:grid-cols-2 overflow-y-auto border-b-[1.2px] border-slate-200 item-center p-2 ">
            <div className="flex flex-row gap-2 items-center h-[60px]">
                <input
                    id={item.color}
                    type="checkbox"
                    checked={isSelected}
                    onChange={handleCheck}
                    className=" cursor-pointer checkbox-info checkbox"
                />
                <label
                    htmlFor={item.color}
                    className="text-black font-medium cursor-pointer"
                >{item.color}</label>
            </div>
            <>
                {isSelected && !file && (
                    <div className=" col-span-2 text-center">
                        <SelectImage item={item} handleFileChange={handleFileChange} />
                    </div>
                )}
                {file && (
                    <div className=" flex flex-row gap-2 text-sm col-span-2 items-center justify-between ">
                        <p>{file?.name}</p>
                        <div className=" w-[70px]">
                            <Button
                                label="Cancle"
                                small
                                outline
                                onClick={() => {
                                    setFile(null);
                                    removeImageFromState(item);
                                }}
                            />
                        </div>
                    </div>
                )}
            </>
        </div>
    );
};

export default SelectColor;
