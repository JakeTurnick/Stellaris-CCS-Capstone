import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Auth/AuthContextProvider";
import Cookies from "js-cookie";
import "./edit-profile.css";

function EditProfile(props) {
	const { user } = useContext(AuthContext);
	// console.log({user})
	const [profile, setProfile] = useState(user);
	const [preview, setPreview] = useState();
	const [editMode, setEditMode] = useState(false);
	const [profileForm, setProfileForm] = useState({
		display_name: profile.display_name,
		avatar: profile.avatar,
	});

	const handleInput = (e) => {
		const { name, value } = e.target;
		setProfileForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};
	const handleImage = (event) => {
		const file = event.target.files[0];
		setProfileForm((prev) => ({
			...prev,
			avatar: file,
		}));

		const reader = new FileReader();
		reader.onloadend = () => {
			setPreview(reader.result);
		};
		reader.readAsDataURL(file);
	};
	const getProfile = async () => {
		const options = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": Cookies.get("csrftoken"),
			},
		};
		const response = await fetch(
			`/api_v1/accs/user/profile/${user.pk}`,
			options
		);
		const data = await response.json();
		console.log("profile: ", { data });
		setProfile((prev) => ({
			...prev,
			display_name: data.display_name,
			avatar: data.avatar,
			bio: data.bio,
		}));
		setProfileForm(profile);
	};

	const submitProfile = async (e) => {
		e.preventDefault();
		const options = {
			method: "PUT",
			headers: {
				"X-CSRFToken": Cookies.get("csrftoken"),
			},
			body: JSON.stringify(profileForm),
		};
		console.log({ profileForm });

		const response = await fetch(
			`/api_v1/accs/user/profile/${user.pk}/`,
			options
		);
		const data = await response.json();
		console.log({ data });
		setEditMode(false);
	};

	useEffect(() => {
		getProfile();
	}, []);

	return (
		<div>
			{/* <button onClick={() => setEditMode(true)}>Edit mode</button>
			<button onClick={() => setEditMode(false)}>not Edit mode</button> */}
			{editMode ? (
				<form onSubmit={submitProfile} className="edit-profile-form">
					{/* <div className="profile-user">

                        <div className="profile-img-wrap">
                            <img src={profile.avatar} alt="A users profile" className="profile-img" />
                        </div>
                        
                        <h3 className="profile-user-name">{profile.username}'s Profile</h3>
                    </div> */}
					<section className="edit-profile-fields">
						<div className="form-group">
							<label htmlFor="display_name">Display name:</label>
							<input
								type="text"
								name="display_name"
								value={profileForm.display_name}
								onChange={handleInput}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="bio">Bio:</label>
							<textarea
								type="textarea"
								name="bio"
								value={profileForm.bio}
								onChange={handleInput}
							/>
						</div>
						{/* <div className="form-group">
							<label htmlFor="">Default zip:</label>
							<input
								type="text"
								name="default_zip"
								value={profile.default_zip}
								onChange={handleInput}
							/>
						</div> */}
						<div className="form-group" id="edit-profile-img">
							<label htmlFor="avatar">Avatar image:</label>
							<input type="file" name="avatar" onChange={handleImage} />

							{preview && (
								<div className="profile-img-wrap">
									<img
										src={preview}
										alt="preview of user avatar image"
										className="profile-img"
									/>
								</div>
							)}
						</div>
						<button onClick={() => setEditMode(false)}>Cancel</button>
						<button type="submit">Update profile</button>
					</section>
				</form>
			) : (
				<article className="profile-display">
					<div className="profile-user">
						{/* <p>avatar img: {profile.avatar}</p> */}
						<div className="profile-img-wrap">
							<img
								src={profile.avatar}
								alt="A users profile"
								className="profile-img"
							/>
						</div>

						<h3 className="profile-user-name">{profile.username}'s Profile</h3>
					</div>
					<div className="profile-info">
						<div>
							<p className="info-title">Display name:</p>
							<p className="info-field">{profile.display_name}</p>
						</div>
						<div>
							<p className="info-title">Default zip:</p>
							<p className="info-field">{profile.default_zip}</p>
						</div>
						<div>
							<p className="info-title">Bio:</p>
							<p className="info-field">{profile.bio}</p>
						</div>

						<button className="edit-info-btn" onClick={() => setEditMode(true)}>
							Edit info
						</button>
					</div>
				</article>
			)}
		</div>
	);
}

export default EditProfile;
