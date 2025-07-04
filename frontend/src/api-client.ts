import type { LogInFormData } from "./pages/LogIn";
import { type RegisterFormData } from "./pages/Register";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async (formData:RegisterFormData)=>{

    const response = await fetch(`${API_BASE_URL}/api/users/register`,{
        method:"POST",
        credentials:"include",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(formData),
    });

    const responseBody = await response.json()
    if(!response.ok){
        throw new Error(responseBody.message);
    }
}

export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials: "include",
    });

    if (!response.ok) { 
        const errorBody = await response.json(); 
        throw new Error(errorBody.message || "Failed to validate token");
    }

    return response.json();
};


export const login = async (formData:LogInFormData)=>{
    const response = await fetch (`${API_BASE_URL}/api/auth/login`,{
        method:"post",
        credentials:"include",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)

    })
        const body = await response.json()
    if(!response.ok){
        
        throw new Error(body.message || "Failed to login")
    }

    return body;
}

export const logout = async()=>{
    const response = await fetch (`${API_BASE_URL}/api/auth/logout`,{
        credentials:"include",
        method:"POST",
    })

    if(!response.ok){
        throw new Error("Error during Log out")
    }
}