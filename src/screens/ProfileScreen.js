import React from 'react';
import '../styles/ProfileScreen.css';

const ProfileScreen = () => {
	return (
		<div className="profileScreen">
			<div className="profileScreen_top">
				<button className="backArrow_button">
					<i class="fas fa-arrow-left"></i>
				</button>
				<p>My Account</p>
			</div>

			<div className="profileScreen_buttom">
				<div className="profileScreen_sidebar">
					<div className="profilePicture">
						<button className="editButton">
							<i class="far fa-edit"></i>
						</button>
					</div>
					<p>User Name</p>
					<button className="profile_signOutButton">Sign Out</button>
				</div>

				<div className="profileScreen_middle">
					<div className="profileScreen_middleTop">
						<h1>Personal Details</h1>
						<div className="personalDetails_container">
							<div className="personalDetails_containerLeft">
								<p>Display Name</p>
								<h4>user name</h4>
								<p>Email</p>
								<h4>user email</h4>
								<p>Password</p>
								<h4>user password</h4>
							</div>
							<div className="personalDetails_containerRight">
								<button className="editButton1">
									<i class="far fa-edit"></i>
									Edit
								</button>
								<button className="editButton2">
									<i class="far fa-edit"></i>
									Edit
								</button>
								<button className="editButton3">
									<i class="far fa-edit"></i>
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
								<p className="middleText1">10 mylist items</p>
								<p>Unlimited Trailers</p>
								<p className="buttomText">Free</p>
								<button className="featuresButton1">
									Active Plan
								</button>
							</div>

							<div className="featuresContainer2">
								<h2>Value Plan</h2>
								<p className="middleText">50 mylist items</p>
								<p>Unlimited Trailers</p>
								<p>Email notifications</p>
								<p className="buttomText">$50/year</p>
								<button className="featuresButton2">
									Upgrade Plan
								</button>
							</div>

							<div className="featuresContainer3">
								<h2>Pro Plan</h2>
								<p className="middleText">
									Unlimited mylist items
								</p>
								<p>Unlimited Trailers</p>
								<p>Email notifications</p>
								<p className="buttomText">$100/year</p>
								<button className="featuresButton3">
									Upgrade Plan
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
