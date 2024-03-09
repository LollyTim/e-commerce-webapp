"ise client"

import { FieldValues, UseFormRegister } from "react-hook-form";

interface CustomChaecboxProps {
    id: string;
    label: string;
    disabled?: boolean;
    register: UseFormRegister<FieldValues>;
    // errors: FieldErrors;
}

const CustomCheckbox: React.FC<CustomChaecboxProps> = ({ id, label, disabled, register }) => {
    return (
        <div className=" w-[80%] flex flex-row gap-2 item-center">
            <label className="cursor-pointer label gap-2">
                <input type="checkbox"
                    id={id}
                    disabled={disabled}
                    {...register(id)} defaultChecked className="checkbox checkbox-info" />
                <span className="label-text text-sky-500">{label}</span>
            </label>
            {/* <input
                type="checkbox"
                id={id}
                disabled={disabled}
                {...register(id)}
                className=" cursor-pointer " />
            <label htmlFor={id} className=" label font-medium cursor-pointer">{label}</label> */}
        </div>
    )
}

export default CustomCheckbox