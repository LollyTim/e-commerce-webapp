"use client";

import { useState } from "react";
import Avatar from "../Avatar";
import { useCallback } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import Link from "next/link";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import BackDrop from "./BackDrop";
import { SafeUser } from "@/types";

interface UserMenuProps {
    currentUser: SafeUser
}

const UserMenue: React.FC<UserMenuProps> = ({ currentUser }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    const fullName = currentUser?.name
    const firstName = fullName?.split(" ")[0];
    return (
        <>
            <div className=" relative z-30">
                <div
                    onClick={toggleOpen}
                    className=" text-gray-100 flex p-2 border-[1px] flex-row items-center gap-1 rounded-full transition cursor-pointer hover:shadow-md "
                >
                    <Avatar src={currentUser?.image} />
                    <p>{firstName}</p>
                    <AiFillCaretDown />
                </div>
                {
                    isOpen && (
                        <div className=" rounded-md absolute shadow-md w-[170px] bg-white overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer">
                            {currentUser ?

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
                                    <hr />
                                    <MenuItem onClick={() => {
                                        toggleOpen()
                                        signOut()
                                    }}>
                                        Logout
                                    </MenuItem>
                                </div> : <div>
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

                                </div>}



                        </div>
                    )
                }
            </div>
            {isOpen ? <BackDrop onClick={toggleOpen} /> : null}
        </>
    );
};

export default UserMenue;
