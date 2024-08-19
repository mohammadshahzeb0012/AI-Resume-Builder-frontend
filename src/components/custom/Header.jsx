import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { UserButton, useUser } from "@clerk/clerk-react"

const Header = () => {
    // user, isLoaded, 
    const { isSignedIn } = useUser()
    return (
        <div className="p-3 px-5 flex justify-between shadow-md">
            <img src="/logo.svg" alt="" />
            {
                // 
                // ai-resume-builder-admin
                isSignedIn ?
                    <div className="flex gap-2 items-center">
                        <Link to={"/dashboard"}>
                        <Button variant="outline">Dashboard</Button>
                        </Link>
                        <UserButton />
                    </div>
                    :
                    <div>
                        <Link to={"/auth/sign-in"}>
                            <Button>Sign In</Button>
                        </Link>
                    </div>
            }
        </div>
    )
}

export default Header