import { Link } from "react-router-dom"
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOut"

const Header = () =>{
    
    const {isLoggedIn} = useAppContext();

    return(
        <div className="bg-blue-500 py-6" >
            <div className="container mx-auto  flex justify-between">
                <span className="text-3xl text-white font-bold tracking-tight">
                    <Link to= "/">KingSha</Link>
                </span>
                <span className="flex space-x-2">
                    {isLoggedIn?(
                        <>
                            <Link to = "/my-bookings" className="flex items-center text-white px-3 font-bold hover:bg-blue-600">My Bookings</Link>
                            <Link to = "/my-hotels" className="flex items-center text-white px-3 font-bold hover:bg-blue-600">My Hotels</Link>
                            <SignOutButton/>
                        </>
                    ):(
                    <>
                        <Link to="/register"
                    className="flex bg-white items-center text-blue-500 px-3 font-bold hover:bg-gray-100">
                    Sign In
                    </Link>
                    
                    <Link to="/log-in" className="flex bg-white items-center text-blue-500 font-bold px-3 hover:bg-gray-100">
                    Log In
                    </Link>
                    </>
                    )
                    
                    }
                    
                </span>
            </div>
        </div>
    )
}

export default Header;