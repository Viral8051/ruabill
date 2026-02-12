"use client";
import { useEffect, useState } from "react";
import Button from "../ui/Button"
import { useRouter } from "next/navigation";

type LoginData = {
    email:string,
    password: string
}

const Login = () => {
    const router =  useRouter();
    const [logindata, setLoginData] = useState<LoginData> ({
        email:"",
        password:"",
    })

    const handleInput = <k extends keyof LoginData>(field:k, value:LoginData[k]) => {
        setLoginData(prev => ({
            ...prev,
            [field]: value,
        }))
        
    }   

    const handleSubmit = async () => {
        if(!logindata.email.trim() || !logindata.password.trim()){
            return alert("please fill the fields");
        }

        try {
            const res = await fetch("/api/login", {
                method:"POST",
                headers: {
                    "Content-type" : "application/json",
                },
                body:JSON.stringify(logindata),
            }) 

            const data = await res.json();

            if(!res.ok){
                return alert(data.message);
            }

            // alert("Login Successfull");
            // localStorage.setItem("isLoggedIn", "true");
            // window.location.href = "/dashboard";
            
            router.push("/dashboard");

            setLoginData({
                email:"",
                password:""
            })
        } catch (error) {
            console.error(error);
            alert("Something went wrong")
        }
    }

return(
    <>
        <div className="Login flex justify-center items-center h-svh">
            <div className="containerMain">
                <div className="Login-main w-full flex flex-col justify-center items-center">
                    <div className="Login-head mb-10">
                        <h2 className="text-3xl text-center text-red-500 font-bold">Login</h2>
                    </div>
                    <form action="" className="w-full md:w-125 shadow-[inset_0_5px_10px_rgba(136,136,136,0.2)] p-10 rounded-3xl">
                        <div className="Login-email flex flex-row items-center justify-between mt-5">
                            <label htmlFor="login-email">Email</label>
                            <input 
                            type="email" 
                            name="login-email" 
                            id="login-email"
                            placeholder="Enter User Email"
                            className="bg-transparent border border-amber-50 rounded-3xl p-2 focus-within:outline-0"
                            value={logindata.email}
                            onChange={(e) => handleInput("email",e.target.value)}
                            />
                        </div>
                        <div className="Login-pass flex flex-row items-center justify-between mt-5">
                            <label htmlFor="login-password">Password</label>
                            <input 
                            type="password" 
                            name="login-pass" 
                            id="login-password"
                            placeholder="Enter User Password"
                            className="bg-transparent border border-amber-50 rounded-3xl p-2 focus-within:outline-0"
                            value={logindata.password}
                            onChange={(e) => handleInput("password",e.target.value)}
                            />
                        </div>
                        <div className="mt-10 text-center block">
                        <Button className="hover:bg-red-500" onClick={handleSubmit}>Login</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
)
}

export default Login