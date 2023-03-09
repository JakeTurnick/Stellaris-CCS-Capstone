import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export const AuthContext = createContext();

function AuthContextProvider({ children }) {
	const [isAuth, setIsAuth] = useState(null);
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	const login = async (e) => {
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": Cookies.get("csrftoken"),
			},
			body: JSON.stringify(user),
		};

		const response = await fetch("/dj-rest-auth/login/", options);

		if (!response.ok) {
			throw new Error("Network response was not OK");
		}
		const data = await response.json();
		Cookies.set("Authorization", `Token ${data.key}`);
		setIsAuth(true);
		navigate("/");
	};

	const register = async (user) => {
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": Cookies.get("csrftoken"),
			},
			body: JSON.stringify(user),
		};

		const response = await fetch("/dj-rest-auth/registration/", options);

		if (!response.ok) {
			throw new Error("Network response was not OK");
		}
		const data = await response.json();
		Cookies.set("Authorization", `Token ${data.key}`);
		setIsAuth(true);
		navigate("/");
	};

	const logout = async () => {
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": Cookies.get("csrftoken"),
			},
		};

		await fetch("/dj-rest-auth/logout/", options);
		Cookies.remove("Authorization");
		setIsAuth(false);
		navigate("/login");
	};

	useEffect(() => {
		const getUser = async () => {
			const response = await fetch("/dj-rest-auth/user/");

			if (!response.ok) {
				setIsAuth(false);
				return;
			}
			const data = await response.json();
			console.log("logged in user: ", data);
			console.log("set  ^^^ as user state");

			setIsAuth(true);
		};

		getUser();
	}, []);

	if (isAuth === null) {
		return <div>Is loading ...</div>;
	}

	return (
		<AuthContext.Provider value={{ isAuth, login, register, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthContextProvider;
