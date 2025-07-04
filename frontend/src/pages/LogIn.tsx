import {useForm} from "react-hook-form"

export type LogInFormData ={
    email:string;
    password:string
}

const LogIn = ()=>{
    
    const {register,formState:{errors}} = useForm<LogInFormData>();

    return(
        <form className="flex flex-col gap-5">
            <h2 className="text-3xl font-bold">Log In</h2>
            <label className="text-gray-700 text-sm font-bold flex-1">
                <input type="email" className="border rounded w-full py-1 px-2 font-normal" {...register("email",{required:"This field is required"})} />
                {errors.email&&(
                    <span className="text-red-500">{errors.email.message}</span>
                )}
            </label>
        </form>
    )
}

export default LogIn