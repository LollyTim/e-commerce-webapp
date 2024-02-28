"use client"

import { IconType } from "react-icons"

interface ButtonProps {
    label: string
    disabled?: boolean
    outline?: boolean
    small?: boolean
    custom: boolean
    icon?: IconType
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}


const Button: React.FC<ButtonProps> = ({ label, disabled, outline, small, custom, icon: Icon, onClick }) => {
    return (
        <button disabled={disabled} className={` disabled:opacity-70 disabled:cursor-not-allowed rounded-md hover:opacity-8 transition w-full  border-slate-700 justify-center items-center flex gap-2 
        ${outline ? "bg-white" : "bg-slate-700"} 
        ${outline ? "text-slate-700" : " text-white"} 
        ${small ? "text-sm font-light" : "text-md font-medium"} 
        ${small ? "py-1 px-2 border-[1px] " : "py-3 py-4 border-[2px]"}
        ${custom ? custom : ""} 
        `}>
            {Icon && <Icon size={25} />}
            {label}
        </button>
    )
}

export default Button