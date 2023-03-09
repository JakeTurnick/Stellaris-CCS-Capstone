import { useState, useContext, useEffect } from "react"
import { AuthContext } from "./AuthContextProvider"
// import "bootstrap/dist/css/bootstrap.min.css";
import "./Auth.css"

function LoginPage(props) {
    const { isAuth, user, login, logout } = useContext(AuthContext)
    const [loginForm, setLoginForm] = useState({});

    const handleInput = (e) => {
        const { name, value } = e.target;
        setLoginForm(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        login(loginForm)
    }

    return (
        <div id="login">
            {isAuth
                ?
                <div>
                    <h1>Looks like you're already signed in as: user</h1>
                    <button onClick={() => logout()} >Sign out</button>
                </div>
                :
                <form id="auth-form" onSubmit={handleSubmit}>
                    <h1>Welcome back!</h1>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input id="username" className="form-control" type="text" name="username" value={loginForm.username} onChange={handleInput}  />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input id="password" className="form-control" type="password" name="password" value={loginForm.password} onChange={handleInput}  />
                    </div>
                    <button type="submit" id="auth-submit" >Log in</button>
                </form>
                
            }
            
        </div>
    )
}

export default LoginPage
