import { useContext } from "react";
import { AuthContext } from "../Auth/AuthContextProvider";
import { Outlet, useNavigate } from "react-router-dom";

function ProtectedRoutes(props) {
	const { isAuth } = useContext(AuthContext);
	const navigate = useNavigate();

	if (!isAuth) {
		navigate("login");
	} else {
		return <Outlet />;
	}
}

export default ProtectedRoutes;
