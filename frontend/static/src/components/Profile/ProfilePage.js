import MyConstellations from "./MyConstellations"
import { useContext } from "react"
import { AuthContext } from "../../Auth/AuthContextProvider"

function ProfilePage(props) {
    const { isAuth, user } = useContext(AuthContext)
    return (
        <div>
            {isAuth ? (
                <div>
                    <h1>I am the profile page</h1>
                    <MyConstellations />
                </div>
            ) : (
                <div>
                    <h1>No profile</h1>
                    <p>If you are seeing this - you need to <a href="/login">Log in</a> or <a href="/signup">Sign up</a></p>
                </div>
            )}
        </div>
        
        
    )
}

export default ProfilePage