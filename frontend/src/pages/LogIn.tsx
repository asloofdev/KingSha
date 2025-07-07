import { useMutation,  useQueryClient } from "@tanstack/react-query";
import {useForm} from "react-hook-form"
import * as apiClient from "../api-client"
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export type LogInFormData ={
    email:string;
    password:string
}

const LogIn = ()=>{
    
    const {register,handleSubmit,formState:{errors}} = useForm<LogInFormData>();

    const queryClient = useQueryClient()

    const {showToast} = useAppContext();
    const navigate = useNavigate();

    const mutation = useMutation({
    mutationFn: apiClient.login,
    onSuccess: async () => {
        await queryClient.invalidateQueries({queryKey:["validateToken"]})
        console.log("User has been Log In");
        showToast({message:"Log in Successfull",type:"SUCCESS"})
        navigate("/")
    },
    onError: (error: Error) => {
        console.log(error.message);
        showToast({message:error.message,type:"ERROR"})
    }
    })

    const onSubmit = handleSubmit((data)=>{
        mutation.mutate(data)
    })

    return(
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Log In</h2>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Email
                <input type="email" className="border rounded w-full py-1 px-2 font-normal" {...register("email",{required:"This field is required"})} />
                {errors.email&&(
                    <span className="text-red-500">{errors.email.message}</span>
                )}
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
               Password
               <input type="password" className="border rounded w-full py-1 px-2 font-normal"{...register("password",{required:"This field is required",minLength:{
                value:6,
                message:"Password must be atleat 6 character"
               }})} /> 
               {errors.password&&(
                <span className="text-red-500">{errors.password.message}</span>
               )}
            </label>

             <span className="flex items-center justify-between">
                <span className="text-sm">Not Register <Link className="underline" to="/register"> Create an account here</Link></span>
                    <button 
                        type="submit" 
                        className="bg-blue-500 text-white p-2 font-bold hover:bg-blue-400 text-xl"
                    >
                        Log In
                    </button>
                </span>
        </form>
    )
}

export default LogIn;