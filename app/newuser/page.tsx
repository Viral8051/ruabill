"use client";

import React, { useEffect, useState } from "react";
import Button from "../ui/Button";
import { useUser } from "@/hooks/useUser";
import bcrypt from  "bcryptjs";
import { useRouter } from "next/navigation";

type User = { 
    userId :string,
    userName: string,
    userEmail: string,
    userPassword : string,
    userNumber: number,
    userType: string,
}

const NewUser = () => {
    const router = useRouter();
    const{addUser} = useUser();
    const [userData, setUserData] = useState<User>({
        userId :"",
        userName: "",
        userEmail: "",
        userPassword : "",
        userNumber: 0,
        userType: "",
    })
    const handleInput = <K extends keyof User> (
        field: K,
        value: User[K]
    ) => {
        setUserData(prev => ({
            ...prev,
            [field] :value,
        }))
    }

    const fetchUser = async() => {
        const res = await fetch('/api/user');
        if(!res.ok){
            console.error("Request Failed");
            return;
        }
        const data = await res.json();
        console.log(data);
    }

    const handleSaveUser = async() =>{
        if(userData.userEmail.trim() === "" || userData.userPassword.trim() === "" || !userData.userNumber ){
            return alert("Please fill the madatory fields");
        }
        const hashPassword = await bcrypt.hash(userData.userPassword,10);
        const finalUser = {
            ...userData,
            userId:
            userData.userId.trim() === ""
            ?Math.floor(Math.random() * 1000000).toString()
            :userData.userId,
            userPassword: hashPassword,
        }
        try {
            await fetch('/api/user',{
                method: 'POST',
                headers: {
                    'content-Type' : 'application/json',
                },
                body: JSON.stringify(finalUser)
            })
            addUser(finalUser);

            alert("User saved!")
            setUserData({
                userId :"",
                userName: "",
                userEmail: "",
                userPassword : "",
                userNumber: 0,
                userType: "super admin",
            })
            
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        
        fetchUser();
    },[])
    return(
        <>
        <div className="new-user h-svh flex justify-center items-center">
            <div className="containerMain">
                <div className="new-user-main w-full md:w-125 m-auto flex justify-center items-center">
                    <form className="w-full shadow-[inset_0_5px_10px_rgba(136,136,136,0.2)] p-10 rounded-3xl">
                        <div className="new-user-head">
                            <h2 className="text-red-500 text-center text-4xl font-bold">Add User</h2>
                        </div>
                        <div className="new-user-inner pt-10">
                            {/* User Name */}
                            <div className="flex flex-row items-center justify-between">
                                <label htmlFor="userName"> Name </label>
                                <input 
                                type="text" 
                                name="user name" 
                                id="userName" 
                                placeholder="Enter User name here"
                                className="bg-transparent border border-amber-50 rounded-3xl p-2 focus-within:outline-0"
                                value={userData.userName}
                                onChange={e => handleInput("userName", e.target.value)}
                                />
                            </div>
                            {/* User Name */}
                            {/* User Email */}
                            <div className="flex flex-row items-center justify-between mt-5">
                                <label htmlFor="userEmail">Email <span className="text-red-600">*</span></label>
                                <input 
                                type="email" 
                                name="user email" 
                                id="userEmail" 
                                placeholder="Enter User Email here"
                                className="bg-transparent border border-amber-50 rounded-3xl p-2 focus-within:outline-0"
                                value={userData.userEmail}
                                onChange={e => handleInput("userEmail", e.target.value)}
                                />
                            </div>
                            {/* User Email */}
                            {/* User Password */}
                            <div className="flex flex-row items-center justify-between mt-5">
                                <label htmlFor="userPass"> Password <span className="text-red-600">*</span></label>
                                <input 
                                type="password" 
                                name="user pass" 
                                id="userPass" 
                                placeholder="Enter User Password here"
                                className="bg-transparent border border-amber-50 rounded-3xl p-2 focus-within:outline-0"
                                value={userData.userPassword}
                                onChange={e => handleInput("userPassword", e.target.value)}
                                />
                            </div>
                            {/* User Password */}
                            {/* User Number */}
                            <div className="flex flex-row items-center justify-between mt-5">
                                <label htmlFor="userNum"> Phone Number <span className="text-red-600">*</span></label>
                                <input 
                                type="number" 
                                name="user number" 
                                id="userNum" 
                                placeholder="Enter User Number here"
                                className="bg-transparent border border-amber-50 rounded-3xl p-2 focus-within:outline-0"
                                value={userData.userNumber}
                                onChange={e => handleInput("userNumber",Number(e.target.value))}
                                />
                            </div>
                            {/* User Number */}

                            <div className="mt-10 text-center block">
                                <Button className="hover:bg-red-500" onClick={handleSaveUser}>Add</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default NewUser