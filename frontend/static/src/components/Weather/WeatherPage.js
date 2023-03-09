import { useContext } from "react";
import { AuthContext } from "../../Auth/AuthContextProvider";
import WeatherWidgit from "./WeatherWidgit";

function WeatherPage(props) {
    const {isAuth, user} = useContext(AuthContext);

    return (
        <div>
            <h1>I am the weather page</h1>
        </div>
    )

}

export default WeatherPage