import {useState} from "react"

const INITIAL_CALC = {
    ra: "02h 31m 47.08s",
    dec: `+89° 15′ 50.9″`,
    time: "2300",
    lat: "34.89",
    lon: "-82.73"
}


function AltitudeCalc(props) {
    const [calcForm, setCalcForm] = useState(INITIAL_CALC)

    const handleInput = (e) => {
        const {name, value} = e.target;
        setCalcForm(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const submitCalc = (e) => {
        e.preventDefault();
        console.log({calcForm})
        const raHrs = calcForm.ra.slice(0,2)
        const raMin = calcForm.ra.slice(4,6)
        const raSec = calcForm.ra.slice(8,13)
        console.log({raHrs, raMin, raSec})
        const decHrs = calcForm.dec.slice(0,3)
        const decMin = calcForm.dec.slice(5,7)
        const decSec = calcForm.dec.slice(9,13)
        console.log({decHrs, decMin, decSec})
    }

    return (
        <div>
            <h1>I will calculate the altitude</h1>
            <form onSubmit={submitCalc}>
                <label htmlFor="ra">Ra:</label>
                <input type="text" name="ra" id="ra" value={calcForm.ra} onChange={handleInput} />

                <label htmlFor="dec">Dec:</label>
                <input type="text" name="dec" id="dec" value={calcForm.dec} onChange={handleInput} />

                <label htmlFor="time">Time:</label>
                <input type="text" name="time" id="time" value={calcForm.time} onChange={handleInput} />

                <label htmlFor="lat">Lat:</label>
                <input type="text" name="lat" id="lat" value={calcForm.lat} onChange={handleInput} />

                <label htmlFor="lon">Lon:</label>
                <input type="text" name="lon" id="lon" value={calcForm.lon} onChange={handleInput} />
                <button type="submit">Get info</button>
            </form>
        </div>
    )
}

export default AltitudeCalc