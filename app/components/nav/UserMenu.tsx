"use client";
import { useState } from "react";
import Avatar from "../Avatar";
import { useCallback } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import Link from "next/link";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import BackDrop from "./BackDrop";

const UserMenue = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);
    return (
        <>
            <div className=" relative z-30">
                <div
                    onClick={toggleOpen}
                    className=" text-gray-100 flex p-2 border-[1px] flex-row items-center gap-1 rounded-full transition cursor-pointer hover:shadow-md "
                >
                    <Avatar />
                    <AiFillCaretDown />
                </div>
                {
                    isOpen && (
                        <div className=" rounded-md absolute shadow-md w-[170px] bg-white overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer">
                            <div>
                                <Link href={"/order"}>
                                    <MenuItem onClick={toggleOpen}>
                                        Your Ordedrs
                                    </MenuItem>
                                </Link>
                                <Link href={"/admin"}>
                                    <MenuItem onClick={toggleOpen}>
                                        Admin Dashboard
                                    </MenuItem>
                                </Link>
                                <MenuItem onClick={() => {
                                    toggleOpen()
                                    signOut()
                                }}>
                                    Logout
                                </MenuItem>
                            </div>
                            <div>
                                <Link href={"/login"}>
                                    <MenuItem onClick={toggleOpen}>
                                        Login
                                    </MenuItem>
                                </Link>
                                <Link href={"/register"}>
                                    <MenuItem onClick={toggleOpen}>
                                        Register
                                    </MenuItem>
                                </Link>

                            </div>
                        </div>
                    )
                }
            </div>
            {isOpen ? <BackDrop onClick={toggleOpen} /> : null}
        </>
    );
};

export default UserMenue;
