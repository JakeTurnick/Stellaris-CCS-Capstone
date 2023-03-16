import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export const AuthContext = createContext();

const INITIAL_USER = {};

function AuthContextProvider({ children }) {
	const [isAuth, setIsAuth] = useState(null);
	const [user, setUser] = useState(INITIAL_USER);
	const navigate = useNavigate();

	const login = async (user) => {
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
		console.log({ data });
		setIsAuth(true);
		setUser({
			username: data.username,
			is_superuser: data.is_superuser,
			default_zip: data.default_zip,
		});
		navigate("/home");
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
		setUser({
			username: data.username,
			isSu: data.is_superuser,
		});
		navigate("/home");
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
		setUser({});
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
			setUser({
				username: data.username,
			});
		};

		getUser();
	}, []);

	if (isAuth === null) {
		return <div>Is loading ...</div>;
	}

	return (
		<AuthContext.Provider value={{ isAuth, user, login, register, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthContextProvider;
