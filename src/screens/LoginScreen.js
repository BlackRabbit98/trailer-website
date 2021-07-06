import React from 'react';
import '../styles/LoginScreen.css';
import LoginPoster from '../assets/LoginPoster.jpg';
import LoginPoster1 from '../assets/LoginPoster1.png';
import LoginPoster2 from '../assets/LoginPoster2.png';
import LoginPoster3 from '../assets/LoginPoster3.png';
import LoginPoster4 from '../assets/LoginPoster4.png';
import LoginPoster5 from '../assets/LoginPoster5.png';
import LoginPoster6 from '../assets/LoginPoster6.png';
import { useState } from 'react';
import Auth from '../components/Auth';

const LoginScreen = () => {
	const [loginForm, setLoginForm] = useState(false);
	const [isSignup, setIsSignup] = useState(false);

	const [email, setEmail] = useState(null);

	const loginHandler = () => {
		setLoginForm(!loginForm);
	};

	return (
		<div className="loginScreen">
			{loginForm && (
				<Auth
					loginHandler={loginHandler}
					getStartedEmail={email}
					isSignup={isSignup}
				/>
			)}

			<div className="loginScreen_header">
				<div className="loginScreen_headerLeft">
					<h2>Trailerzz</h2>
				</div>
				<div className="loginScreen_headerRight">
					<button
						className="loginScreen_signIn"
						onClick={() => {
							setIsSignup(false);
							loginHandler();
						}}>
						Sign In
					</button>
				</div>
			</div>

			<div className="loginScreen_top">
				<img
					className="loginScreen_poster"
					src={LoginPoster}
					alt="login poster"
				/>
				<div className="loginScreen_topContents">
					<p className="sentence1">
						Watch any movie trailers anytime, anywhere
					</p>
					<p className="sentence2">Join the best movie community</p>
					<p className="sentence3">
						Ready to watch trailers? Enter your email to join the
						community.
					</p>

					<div className="emailbar">
						<input
							type="email"
							placeholder="Email Address"
							onChange={(e) => setEmail(e.target.value)}
						/>
						<button
							className="getStarted_button"
							onClick={() => {
								setIsSignup(true);
								loginHandler();
							}}>
							Get Started
						</button>
					</div>
				</div>
			</div>
			<div className="loginScreen_bottom">
				<p className="sentence4">Powered by TMDB Api</p>
				<img
					className="loginScreen_poster1"
					src={LoginPoster1}
					alt="login poster1"
				/>
				<p className="sentence4">
					Millions of movies, TV shows and people to discover. Explore
					now.
				</p>
				<div className="moviePosters">
					<img src={LoginPoster2} alt="" />
					<img src={LoginPoster3} alt="" />
					<img src={LoginPoster4} alt="" />
					<img src={LoginPoster5} alt="" />
					<img src={LoginPoster6} alt="" />
					<img src={LoginPoster2} alt="" />
				</div>
			</div>
		</div>
	);
};

export default LoginScreen;
