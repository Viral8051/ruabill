import React from 'react'

type ButtonProps =  {
    
    onClick ?:  () =>  void;
    type?: "button" | "submit";
    className ?: string;
    children : React.ReactNode; 
};

function Button({ className, onClick, children, type = "button"} : ButtonProps) {
  return (
    <button
     type={type}
     onClick={onClick}
     className= {`${className ?? ""} border-2 px-5 py-2 rounded-full font-bold transition-all ease-in-out duration-500`}
    >
        {children}
    </button>
  )
}

export default Button