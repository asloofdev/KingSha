import { useForm } from "react-hook-form";

type RegisterFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const Register = () => {
    const { register, watch, handleSubmit } = useForm<RegisterFormData>();
    const onSubmit = handleSubmit((data) => {
        console.log(data);
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
                </label>

                <label className="text-gray-700 text-sm font-bold flex-1">
                    Last Name
                    <input 
                        className="border rounded w-full py-1 px-2 font-normal" 
                        {...register("lastName", { required: "This field is required" })}
                    />
                </label>

             </div>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Email
                    <input 
                        type="email"
                        className="border rounded w-full py-1 px-2 font-normal"
                        {...register("email", { required: "This field is required" })}
                    />
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
                </label>
                
                <span>
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