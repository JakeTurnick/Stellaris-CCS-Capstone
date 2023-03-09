import { useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContextProvider";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./Auth.css";

function RegisterPage(props) {
	const { isAuth, user, register, logout } = useContext(AuthContext);
	const [registerForm, setRegisterForm] = useState({});

	const handleInput = (e) => {
		const { name, value } = e.target;
		setRegisterForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		register(registerForm);
	};

	return (
		<div id="register">
			{isAuth ? (
				<div>
					<h1>Looks like you're already signed in as: user</h1>
					<button onClick={() => logout()}>Sign out</button>
				</div>
			) : (
				<form id="auth-form" onSubmit={handleSubmit}>
					<h1>Welcome to Stellaris!</h1>
					<div className="form-group">
						<label htmlFor="username">Username:</label>
						<input
							id="username"
							className="form-control"
							type="text"
							name="username"
							value={registerForm.username}
							onChange={handleInput}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="email">Email:</label>
						<input
							id="email"
							className="form-control"
							type="email"
							name="email"
							value={registerForm.email}
							onChange={handleInput}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password1">Password:</label>
						<input
							id="password1"
							className="form-control"
							type="password"
							name="password1"
							value={registerForm.password1}
							onChange={handleInput}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password1">Confirm Password:</label>
						<input
							id="password2"
							className="form-control"
							type="password"
							name="password2"
							value={registerForm.password2}
							onChange={handleInput}
						/>
					</div>
					<button type="submit" id="auth-submit">
						Log in
					</button>
				</form>
			)}
		</div>
	);
}

export default RegisterPage;
