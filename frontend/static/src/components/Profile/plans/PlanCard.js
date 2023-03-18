import {useState} from "react"
import Cookies from "js-cookie";
import "./plan-card.css"

function PlanCard(props) {

    const [editMode, setEditMode] = useState(false)
    const [plan, setPlan] = useState(props.plan);
    console.log({plan})


    const handleInput = (e) => {
		const { name, value } = e.target;
		setPlan((prev) => ({
			...prev,
			[name]: value,
		}));
	};
    
    const updatePlan = async (e) => {
        e.preventDefault();
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get("csrftoken")
            },
            body: JSON.stringify(plan)
        }
        const response = await fetch(`/api_v1/accs/user/plans/${plan.pk}/`, options)
        const data = await response.json()
        console.log({data})
    }

    return (
        <li>
            {editMode ? (
                <form onSubmit={updatePlan} className="plan-form">
                    <input type="text" name="title" value={plan.title} onChange={handleInput} />
                    <input type="date" name="date" value={plan.date} onChange={handleInput}  />
                    <input type="text" name="notes" value={plan.notes} onChange={handleInput}  />
                    <div>
                        <button onClick={() => setEditMode(false)}>Preview</button>
                        <button type="submit">Update</button>
                    </div>
                    
                </form>
            ) : (
                <article>
                    <h2>I am a Plan card</h2>
                    <h3>{plan.title}</h3>
                    <p>{plan.date}</p>
                    <p>{plan.notes}</p>
                    <button onClick={() => setEditMode(true)}>Edit</button>
                </article>
            )}
            
        </li>
    )
}

export default PlanCard