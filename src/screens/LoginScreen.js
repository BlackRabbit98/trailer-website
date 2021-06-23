import React from 'react';
import '../styles/LoginScreen.css';
import LoginPoster from '../assets/LoginPoster.png';
import LoginPoster1 from '../assets/LoginPoster1.png';
import LoginPoster2 from '../assets/LoginPoster2.png';
import LoginPoster3 from '../assets/LoginPoster3.png';
import LoginPoster4 from '../assets/LoginPoster4.png';
import LoginPoster5 from '../assets/LoginPoster5.png';
import LoginPoster6 from '../assets/LoginPoster6.png';

const LoginScreen = () => {
	return (
		<div className="loginScreen">
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
						<p>Email Address</p>
						<button>Get Started</button>
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
				</div>
			</div>
		</div>
	);
};

export default LoginScreen;
