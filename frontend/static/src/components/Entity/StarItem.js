import Cookies from "js-cookie"

function StarItem(props) {
    console.log("StarItem props", props)
    const star = props.star

    console.log("body", {
        "e_type": props.type,
        "name": star.name,
        "date": null,
        "ra": star.right_ascension,
        "dec": star.declination,
        "spec_class": star.spectral_class,
        "abs_mag": star.absolute_magnitude,
        "app_mag": star.apparent_magnitude,
        "ly_dist": star.distance_light_year,
    })

    const postStar = async (e) => {
        console.log(star)

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get("csrftoken")
            },
            body: {
                "e_type": props.type,
                "name": star.name,
                "date": null,
                "ra": star.right_ascension,
                "dec": star.declination,
                "spec_class": star.spectral_class,
                "abs_mag": star.absolute_magnitude,
                "app_mag": star.apparent_magnitude,
                "ly_dist": star.distance_light_year,
            }
        }
    }

    return (
        <li>Name: {star.name} | 
            Constellation: {star.constellation} | 
            RA: {star.right_ascension} | 
            DEC: {star.declination} | 
            <button onClick={postStar}>Add {star.name} to DB</button>
        </li>
    )
}

export default StarItem