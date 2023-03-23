import { useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContextProvider";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./Auth.css";

function RegisterPage(props) {
	const { isAuth, user, register, logout } = useContext(AuthContext);
	const [registerForm, setRegisterForm] = useState({});
	const [profileForm, setProfileForm] = useState({});

	const handleInput = (e) => {
		const { name, value } = e.target;
		setRegisterForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("register form", registerForm);
		register(registerForm);
	};

	return (
		<div id="register">
			{isAuth ? (
				<div>
					<h1>Looks like you're already signed in as: {user.username}</h1>
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
					<p>Optional Fields:</p>
					<div className="form-group">
						<label htmlFor="email">Email:</label>
						<input
							id="email"
							className="form-control"
							type="email"
							name="email"
							value={registerForm.email}
							onChange={handleInput}
							placeholder=""
						/>
					</div>
					<div className="form-group">
						<label htmlFor="default_zip">Default Zip:</label>
						<input
							id="default_zip"
							className="form-control"
							type="text"
							name="default_zip"
							value={registerForm.default_zip}
							onChange={handleInput}
							placeholder="Used for Weather & Moon phasa"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="phone_number">Phone number:</label>
						<input
							id="phone_number"
							className="form-control"
							type="text"
							name="phone_number"
							value={registerForm.phone_number}
							onChange={handleInput}
							placeholder="Used for Notifications"
						/>
					</div>

					<button type="submit" id="auth-submit">
						Register
					</button>
				</form>
			)}
		</div>
	);
}

export default RegisterPage;
