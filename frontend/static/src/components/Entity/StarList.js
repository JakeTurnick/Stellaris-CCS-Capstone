import StarItem from "./StarItem";
import { nanoid } from "nanoid";
import Cookies from "js-cookie";

function StarList(props) {
	// console.log("Star list props", props)
	const starsHTML = props.stars.map((star) => (
		<StarItem key={nanoid()} star={star} type={props.starType} />
	));

	return <ul>{starsHTML}</ul>;
}

export default StarList;
