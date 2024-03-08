"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface TextAreaProps {
    id: string;
    placeholder: string;
    disabled?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    // icon: React.ReactElement;
}

const TextArea: React.FC<TextAreaProps> = ({
    id,
    placeholder,
    disabled,
    required,
    register,
    errors,
    // icon,
}) => {
    return (
        <div className="w-[80%]">
            {/* <placeholder
                className={`${errors[id] ? "text-rose-500" : "text-sky-500"
                    }  textarea textarea-info max-h-[150px] min-h-[150px] flex items-center w-[full] max-w-[400px] gap-2`}
            > */}

            <textarea
                id={id}
                disabled={disabled}
                {...register(id, { required })}
                placeholder={placeholder}
                className={` grow ${errors[id] ? "border-rose-400" : "border-sky-500"
                    } ${errors[id] ? " placeholder:text-rose-500" : " placeholder:text-sky-500"
                    }
            ${errors[id] ? "focus:border-rose-400" : "focus:border-slate-300"} textarea border-info text-sky-500 textarea-info max-h-[150px] min-h-[150px] flex items-center w-full textarea-bordered max-w-[400px] gap-2`}
            />
            {/* </placeholder> */}
        </div>
    );
};

export default TextArea;
