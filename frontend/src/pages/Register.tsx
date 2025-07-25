import {  useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as apiClient from "../api-client"
import { useAppContext } from "../contexts/AppContext";
import { useNavigate,Link } from "react-router-dom";

export type RegisterFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const Register = () => {

    const navigate = useNavigate();
    const queryClient = useQueryClient()
    
    const {showToast} = useAppContext();
    
    const { register, watch, handleSubmit,formState:{errors} } = useForm<RegisterFormData>();

    const mutation = useMutation({mutationFn:apiClient.register,
        onSuccess:async()=>{
            await queryClient.invalidateQueries({ queryKey: ["validateToken"] })
            showToast({message:"Registration Success", type:"SUCCESS"})
            navigate("/")
        },
        onError:(error:Error)=>{
            showToast({message:error.message,type:"ERROR"})
        },
    });

    const onSubmit = handleSubmit((data) => {
        
        mutation.mutate(data)
    });
    
    return (
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">
                Create Account
            </h2>
            <div className="flex flex-col md:flex-row gap-5">
                <label className="text-gray-700 text-sm font-bold flex-1">
                    First Name
                    <input 
                        {...register("firstName", { required: "This field is required" })} 
                        className="border rounded w-full py-1 px-2 font-normal" 
                    />
                    {errors.firstName&&(
                        <span className="text-red-500">{errors.firstName.message}</span>
                    )}
                </label>

                <label className="text-gray-700 text-sm font-bold flex-1">
                    Last Name
                    <input 
                        className="border rounded w-full py-1 px-2 font-normal" 
                        {...register("lastName", { required: "This field is required" })}
                    />
                     {errors.lastName&&(
                        <span className="text-red-500">{errors.lastName.message}</span>
                    )}
                </label>

             </div>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Email
                    <input 
                        type="email"
                        className="border rounded w-full py-1 px-2 font-normal"
                        {...register("email", { required: "This field is required" })}
                    />
                     {errors.email&&(
                        <span className="text-red-500">{errors.email.message}</span>
                    )}
                </label>

                <label className="text-gray-700 text-sm font-bold flex-1">
                    Password
                    <input 
                        type="password" 
                        className="border rounded w-full py-1 px-2 font-normal"
                        {...register("password", {
                            required: "This field is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters"
                            }
                        })} 
                    />
                     {errors.password&&(
                        <span className="text-red-500">{errors.password.message}</span>
                    )}
                </label>
                
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Confirm Password
                    <input 
                        type="password" 
                        className="border rounded w-full py-1 px-2 font-normal"
                        {...register("confirmPassword", {
                            validate: (val: string) => {
                                if (!val) {
                                    return "This field is required";
                                } else if (watch("password") !== val) {
                                    return "Passwords do not match";
                                }
                            }
                        })} 
                    />
                     {errors.confirmPassword&&(
                        <span className="text-red-500">{errors.confirmPassword.message}</span>
                    )}
                </label>
                
                <span className="flex items-center justify-between">
                    <span className="text-sm">
                        Already register <Link className="underline" to="/log-in">Click here to Log-In</Link>
                    </span>
                    <button 
                        type="submit" 
                        className="bg-blue-500 text-white p-2 font-bold hover:bg-blue-400 text-xl"
                    >
                        Create Account
                    </button>
                </span>
           
        </form>
    );
};

export default Register;