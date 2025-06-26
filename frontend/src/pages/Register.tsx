import { useForm } from "react-hook-form";

type RegisterFormData = {
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    confirmPassword:string
}

const Register =  () =>{

    const {register} = useForm <RegisterFormData>();

    return(
        <form action="" className="flex felx-col gap-5">
            <h2 className="text-3xl font-bold">
                Create Account
            </h2>
            <div className="flex flex-col md:flex-row gap-5 ">
                <label className="text-gray-700 text-sm font-bold flex-1">
                    First Name
                <input {...register("firstName",{required:"This field is required"})} className="border rounded w-full py-1 px-2 font-normal" />
                </label>

                <label className="text-gray-700 text-sm font-bold flex-1" >
                    Last Name
                    <input className="border rounded w-full py-1 px-2 font-normal" {...register("lastName",{required:"This field is required"})}/>
                </label>

                <label className="text-gray-700 text-sm font-bold flex-1">
                    Password
                    <input type="password" className="border rounded w-full py-1 px-2 font-normal"{...register("password",{required:"This field is required:",
                        minLength:{
                            value:6,
                            message:"password must be atleat 6 characters"
                        }
                    })} />
                </label>

                <label className=""></label>
            </div>
        </form>
    )
}

export default Register;