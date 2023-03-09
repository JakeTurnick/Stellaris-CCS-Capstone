import { useContext } from "react";
import { AuthContext } from "../../Auth/AuthContextProvider";

function HomePage(props) {
	const { isAuth } = useContext(AuthContext);

	return (
		<div>
			<h1>I am the home page</h1>
		</div>
	);
}

export default HomePage;
