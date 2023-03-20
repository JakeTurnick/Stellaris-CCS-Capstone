import {useContext, useState, useEffect} from "react"
import { AuthContext } from "../../Auth/AuthContextProvider"
import Cookies from "js-cookie"
import "./edit-profile.css"

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
                <form action="" className="edit-profile-form">
                    <div className="profile-user">
                        {/* <p>avatar img: {profile.avatar}</p> */}
                        <div className="profile-img-wrap">
                            <img src={profile.avatar} alt="A users profile" className="profile-img" />
                        </div>
                        
                        <h3 className="profile-user-name">{profile.username}'s Profile</h3>
                    </div>
                    <section className="edit-profile-fields">
                        <div className="form-group">
                            <label htmlFor="">Display name:</label>
                            <input type="text" name="display_name" value={profile.display_name} onChange={handleInput} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Default zip:</label>
                            <input type="text" name="default_zip" value={profile.default_zip} onChange={handleInput} />
                        </div>
                        <div className="form-group" id="edit-profile-img">
                            <label htmlFor="">Avatar image:</label>
                            <input type="file" name="avatar" onChange={handleImage}/>
                            <div className="profile-img-wrap">
                                {profile.avatar && <img src={profile.avatar} alt="" className="profile-img"  />}
                            </div>
                            
                        </div>
                    </section>
                    

                </form>
            ) : (
                <article className="profile-display">
                    <div className="profile-user">
                        {/* <p>avatar img: {profile.avatar}</p> */}
                        <div className="profile-img-wrap">
                            <img src={profile.avatar} alt="A users profile" className="profile-img" />
                        </div>
                        
                        <h3 className="profile-user-name">{profile.username}'s Profile</h3>
                        
                    </div>
                    <div className="profile-info">
                        <p><span className="info-field">Display name:</span> {profile.display_name}</p>
                        <p><span className="info-field">default zip:</span> {profile.default_zip}</p>
                        <p><span className="info-field">bio?</span></p>
                        <button className="edit-info-btn" onClick={() => setEditMode(true)} >Edit info</button>
                    </div>
                    
                </article>
            )}
        </div>
    )
}

export default EditProfile