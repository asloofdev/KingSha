import { Link } from "react-router-dom"

const Header = () =>{
    return(
        <div className="bg-blue-500 py-6" >
            <div className="container mx-auto  flex justify-between">
                <span className="text-3xl text-white font-bold tracking-tight">
                    <Link to= "/">KingSha</Link>
                </span>
                <span className="flex space 2 ">
                    <Link to="/sign-in"
                    className="flex bg-white items-center text-blue-500 px-3 font-bold hover:bg-gray-500">
                    Sign In
                    </Link>
                </span>
            </div>
        </div>
    )
}

export default Header;