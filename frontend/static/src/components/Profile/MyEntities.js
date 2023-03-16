// Import useEffect, useState

function MyEntites(props) {



    const getEntites = async () => {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",

            },
        }
        const response = await fetch("api_v1/accs/user/constellations/", options)
        const data = await response.json()
        console.log({data})
    }

    return (
        <article>
            <h2>These are my tracked entities:</h2>
        </article>
    )
}

export default MyEntites