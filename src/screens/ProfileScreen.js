import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
	getUserDetails,
	logout,
	updateUserProfile,
} from '../actions/userActions';
import '../styles/ProfileScreen.css';
import db, { auth } from '../utils/firebase';
import firebase from 'firebase';
import { toast } from 'react-toastify';

const ProfileScreen = () => {
	const [displayName, setDisplayName] = useState('');
	const [email, setEmail] = useState('');
	const [photoURL, setPhotoURL] = useState('');
	const [password, setPassword] = useState('');
	const updateValRef = useRef(null);
	const pwRef = useRef(null);

	const [type, setType] = useState('');
	const [showPopup, setShowPopup] = useState(false);

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDetails = useSelector((state) => state.userDetails);
	const { user } = userDetails;

	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		dispatch(getUserDetails());
		const user = auth.currentUser;
		if (user) {
			setDisplayName(user.displayName);
			setEmail(user.email);
			setPhotoURL(user.photoURL);
		}
		//console.log(user);
		return () => {
			//cleanup
		};
	}, [dispatch]);

	const downgradeToBasic = async () => {
		await db
			.collection('movies')
			.doc(userInfo.uid)
			.set({
				favMovies: [...user.favMovies],
				limit: 10,
			});
		dispatch(getUserDetails());
	};

	const updateUsername = (displayName) => {
		const user = auth.currentUser;

		user.updateProfile({
			displayName,
		})
			.then(() => {
				if (user) {
					setDisplayName(user.displayName);
					setEmail(user.email);
					setPhotoURL(user.photoURL);

					toast.info(
						'✔️ Your user-name has been changed successfully!',
						{
							position: 'top-center',
							autoClose: 2500,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
						}
					);
				}
				// Update successful
				//console.log('Update successful');
			})
			.catch((error) => {
				// An error occurred
				//console.log('Error Occured', error);
			});
	};

	const updateUserPhoto = (photoURL) => {
		const user = auth.currentUser;

		user.updateProfile({
			photoURL,
		})
			.then(() => {
				const user = auth.currentUser;
				if (user) {
					setDisplayName(user.displayName);
					setEmail(user.email);
					setPhotoURL(user.photoURL);

					toast.info(
						'✔️ Your profile pic has been changed successfully!',
						{
							position: 'top-center',
							autoClose: 2500,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
						}
					);
				}
				// Update successful
				//console.log('Update successful');
			})
			.catch((error) => {
				// An error occurred
				//console.log('Error Occured', error);
			});
	};

	const updateUserEmail = (val) => {
		const user = auth.currentUser;
		const credential = firebase.auth.EmailAuthProvider.credential(
			user.email,
			pwRef.current.value
		);

		user.reauthenticateWithCredential(credential)
			.then(() => {
				// User re-authenticated.
				user.updateEmail(val)
					.then(() => {
						// Update successful
						if (user) {
							setDisplayName(user.displayName);
							setEmail(user.email);
							setPhotoURL(user.photoURL);

							toast.info(
								'✔️ Your email has been changed successfully!',
								{
									position: 'top-center',
									autoClose: 2500,
									hideProgressBar: false,
									closeOnClick: true,
									pauseOnHover: true,
									draggable: true,
									progress: undefined,
								}
							);
						}
						//console.log('Update successful');
					})
					.catch((error) => {
						// An error occurred
						//console.log('Error Occured', error);
					});
			})
			.catch((error) => {
				// An error ocurred
				// ...
				console.log('Error Occured', error);
			});
	};

	const updateUserPassword = (val) => {
		const user = auth.currentUser;
		const credential = firebase.auth.EmailAuthProvider.credential(
			user.email,
			pwRef.current.value
		);

		user.reauthenticateWithCredential(credential)
			.then(() => {
				// User re-authenticated.
				user.updatePassword(val)
					.then(() => {
						toast.info(
							'✔️ Your password has been changed successfully!',
							{
								position: 'top-center',
								autoClose: 2500,
								hideProgressBar: false,
								closeOnClick: true,
								pauseOnHover: true,
								draggable: true,
								progress: undefined,
							}
						);
						// Update successful
						console.log('Update successful');
					})
					.catch((error) => {
						// An error occurred
						console.log('Error Occured', error);
					});
			})
			.catch((error) => {
				// An error ocurred
				// ...
				console.log('Error Occured', error);
			});
	};

	const ChangeDataPopupSubmitHandler = (e) => {
		e.preventDefault();
		console.log(password);
		console.log(updateValRef.current.value);
		if (type === 'Name') {
			updateUsername(updateValRef.current.value);
		} else if (type === 'Photo URL') {
			updateUserPhoto(updateValRef.current.value);
		} else if (type === 'Email') {
			updateUserEmail(updateValRef.current.value);
		} else if (type === 'Password') {
			updateUserPassword(updateValRef.current.value);
		}
		setShowPopup(!showPopup);
	};

	const ChangeDataPopup = () => {
		let isSecret = false;
		if (type === 'Email') {
			isSecret = true;
		} else if (type === 'Password') {
			isSecret = true;
		}
		return (
			<div className="changeProfileData">
				<div
					className="changeProfileData_modal"
					onClick={(e) => {
						if (e.target === e.currentTarget) {
							setShowPopup(!showPopup);
						}
					}}
				/>
				<div className="changeProfileData_main">
					<div className="cancelButton_container">
						<div
							className="cancelButton"
							onClick={() => setShowPopup(!showPopup)}>
							<i className="fas fa-times"></i>
						</div>
					</div>
					<label>New {type}</label>
					<input type="text" ref={updateValRef} />
					{isSecret && (
						<div>
							<label>Enter Current Password</label>
							<input ref={pwRef} />
						</div>
					)}

					<button onClick={ChangeDataPopupSubmitHandler}>Save</button>
				</div>
			</div>
		);
	};

	const capitalizeFirstLetter = (s) =>
		(s && s[0].toUpperCase() + s.slice(1)) || '';

	return (
		<div className="profileScreen">
			{showPopup && <ChangeDataPopup />}
			<div className="profileScreen_top">
				<button
					className="backArrow_button"
					onClick={() => history.push('/')}>
					<i className="fas fa-arrow-left"></i>
				</button>
				<p>My Account</p>
			</div>

			<div className="profileScreen_buttom">
				<div className="profileScreen_sidebar">
					<div className="profilePicture">
						<div>
							<img
								src={
									photoURL ||
									'https://www.numerator.com/themes/custom/themekit/images/default-profile.png'
								}
								alt=""
							/>
						</div>
						<button
							className="editButton"
							onClick={() => {
								setType('Photo URL');
								setShowPopup(true);
							}}>
							<i className="far fa-edit"></i>
						</button>
					</div>
					<p>
						{capitalizeFirstLetter(
							displayName || email.split('@')[0]
						)}
					</p>
					<button
						className="profile_signOutButton"
						onClick={() => dispatch(logout())}>
						Sign Out
					</button>
				</div>

				<div className="profileScreen_middle">
					<div className="profileScreen_middleTop">
						<h2>Personal Details</h2>
						<div className="personalDetails_container">
							<div className="personalDetails_containerLeft">
								<p>Display Name</p>
								<h4>
									{capitalizeFirstLetter(
										displayName || email.split('@')[0]
									)}
								</h4>
								<p>Email</p>
								<h4>{email}</h4>
								<p>Password</p>
								<h4>It's a secret!</h4>
							</div>
							<div className="personalDetails_containerRight">
								<button
									className="editButton1"
									onClick={() => {
										setType('Name');
										setShowPopup(true);
									}}>
									<i className="far fa-edit"></i>
									Edit
								</button>
								<button
									className="editButton2"
									onClick={() => {
										setType('Email');
										setShowPopup(true);
									}}>
									<i className="far fa-edit"></i>
									Edit
								</button>
								<button
									className="editButton3"
									onClick={() => {
										setType('Password');
										setShowPopup(true);
									}}>
									<i className="far fa-edit"></i>
									Edit
								</button>
							</div>
						</div>
					</div>

					<div className="profileScreen_middleButtom">
						<h2>Need more features? Upgrade your subscriptions</h2>
						<div className="moreFeatures_container">
							<div className="featuresContainer1">
								<h2>Free Plan</h2>
								<p className="topText1">Free</p>
								<div className="midText1">
									<p>
										<i className="far fa-check-circle"></i>{' '}
										10 mylist items
									</p>
									<p>
										<i className="far fa-check-circle"></i>{' '}
										Unlimited Trailers
									</p>
								</div>
								<button
									className={`featuresButton ${
										user.limit === 10 &&
										'featurebuttonActive'
									}`}
									onClick={downgradeToBasic}>
									{user.limit === 10
										? 'Active Plan'
										: 'Downgrade Plan'}
								</button>
							</div>

							<div className="featuresContainer2">
								<h2>Value Plan</h2>
								<p className="topText">$50/year</p>
								<div className="midText">
									<p>
										<i className="far fa-check-circle"></i>{' '}
										50 mylist items
									</p>
									<p>
										<i className="far fa-check-circle"></i>{' '}
										Unlimited Trailers
									</p>
									<p>
										<i className="far fa-check-circle"></i>{' '}
										Email notifications
									</p>
								</div>
								<button
									className={`featuresButton ${
										user.limit === 50 &&
										'featurebuttonActive'
									}`}
									onClick={() =>
										history.push('/payment/value')
									}>
									{user.limit === 50
										? 'Active Plan'
										: user.limit === 10
										? 'Upgrade Plan'
										: 'Downgrade Plan'}
								</button>
							</div>

							<div className="featuresContainer3">
								<h2>Pro Plan</h2>
								<p className="topText">$100/year</p>
								<div className="midText">
									<p>
										<i className="far fa-check-circle"></i>{' '}
										Unlimited mylist items
									</p>
									<p>
										<i className="far fa-check-circle"></i>{' '}
										Unlimited Trailers
									</p>
									<p>
										<i className="far fa-check-circle"></i>{' '}
										Email notifications
									</p>
								</div>
								<button
									className={`featuresButton ${
										user.limit === 1000 &&
										'featurebuttonActive'
									}`}
									onClick={() =>
										history.push('/payment/pro')
									}>
									{user.limit === 1000
										? 'Active Plan'
										: 'Upgrade Plan'}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileScreen;
