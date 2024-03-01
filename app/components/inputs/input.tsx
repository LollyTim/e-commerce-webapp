"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    // icon: React.ReactElement;
}

const Input: React.FC<InputProps> = ({
    id,
    label,
    type,
    disabled,
    required,
    register,
    errors,
    // icon,
}) => {
    return (
        <div className="w-[80%]">
            {/* <input
              
                className={` `}
            />
            <label htmlFor={id} className=" absolute cursor-text text-base duration-150 transform top-5 left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-4  -translate-y-3 z-10 origin-[0]  " >
                {label}
            </label> */}

            <label className={`   ${errors[id] ? "text-rose-500" : "text-slate-500"}  input input-bordered input-info flex items-center w-[300px] max-w-[400px] gap-2`}>
                {label}
                <input type={type}
                    autoComplete="off"
                    id={id}
                    disabled={disabled}
                    {...register(id, { required })}
                    placeholder="" className={` grow ${errors[id] ? "border-rose-400" : "border-slate-300"} 
            ${errors[id] ? "focus:border-rose-400" : "focus:border-slate-300"}`} />
            </label>
        </div>
    );
};

export default Input;
