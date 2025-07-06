import { useMutation } from "@tanstack/react-query"
import * as apiClient from "../api-client"
import { useAppContext } from "../contexts/AppContext"

const SignOutButton = () =>{

    const {showToast} = useAppContext();

    const mutaton = useMutation({
        mutationFn:apiClient.logout,
        onSuccess:()=>{
            showToast({message:"Log Out",type:"SUCCESS"
            })
        },
        onError:(error:Error)=>{
            showToast({message:error.message,type:"ERROR"})
        }
    })

    const handleClick =()=>{
        mutaton.mutate()
    }

    return(
        <button onClick={handleClick} className="text-blue-500 px-3 font-bold bg-white hover:bg-gray-700">
            Sign Out
        </button>
    )
}

export default SignOutButton