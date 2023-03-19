import {useContext, useState, useEffect} from "react"
import { AuthContext } from "../../Auth/AuthContextProvider"
import Cookies from "js-cookie"

function EditProfile(props) {
    const {user} = useContext(AuthContext)
    // console.log({user})
    const [profile, setProfile] = useState(user)
    const [editMode, setEditMode] = useState(false)
    const [profileForm, setProfileForm] = useState()

    const handleInput = (e) => {
        const {name, value} = e.target;
        setProfile(prev => ({
            ...prev,
            [name]: value,
        }))
    }
    const handleImage = (event) => {
        const file = event.target.files[0];
        setProfile({
          ...profile,
          avatar: file,
        });
    }
    const getProfile = async () => {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get('csrftoken'),
            }
        }
        const response = await fetch(`/api_v1/accs/user/profile/${user.pk}`, options)
        const data = await response.json()
        console.log({data})
        setProfile(prev => ({
            ...prev,
            display_name: data.display_name,
            avatar: data.avatar

        }))
    }

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <div>
            <button onClick={() => setEditMode(true)} >Edit mode</button>
            <button onClick={() => setEditMode(false)} >not Edit mode</button>
            {editMode ? (
                <form action="">
                    <div className="form-group">
                        <label htmlFor="">Display name:</label>
                        <input type="text" name="display_name" value={profile.display_name} onChange={handleInput} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Default zip:</label>
                        <input type="text" name="default_zip" value={profile.default_zip} onChange={handleInput} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Avatar image:</label>
                        <input type="file" name="avatar" onChange={handleImage} />
                        {profile.avatar && <img src={profile.avatar} alt="" />}
                    </div>

                </form>
            ) : (
                <article>
                    <div className="profile-name">
                        <p>avatar img: {profile.avatar}</p>
                        <img src={profile.avatar} alt="A users profile" />
                        <h3>Profile for user: {profile.username}</h3>
                        <p>default zip: {profile.default_zip}</p>
                    </div>
                    <div className="profile-info">
                        <p>Display name: {profile.display_name}</p>
                        <p>bio?</p>
                    </div>
                    
                </article>
            )}
        </div>
    )
}

export default EditProfile