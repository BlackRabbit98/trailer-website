import React from 'react';
import '../styles/MyListScreen.css';
import LoginPoster2 from '../assets/LoginPoster2.png';
import LoginPoster3 from '../assets/LoginPoster3.png';
import { useState } from 'react';

const IndividualMovie = ({ src = '' }) => {
	const [showMovieDetails, setShowMovieDetails] = useState(false);

	return (
		<div className="myList_row">
			{showMovieDetails && (
				<div
					onClick={(e) => {
						if (e.target === e.currentTarget) {
							console.log(e.target, e.currentTarget);
							setShowMovieDetails(!showMovieDetails);
						}
					}}
					className="myList_row_modal"
				/>
			)}
			<img
				className={`myList_img ${showMovieDetails && 'big-poster-img'}`}
				onClick={() => setShowMovieDetails(!showMovieDetails)}
				src={src}
				alt=""
			/>

			{showMovieDetails && (
				<div className="myList_rowEffects">
					<h2>Title(Year)</h2>
					<p>description</p>
					<p>rating</p>
					<div className="rowEffects_button">
						<button>
							<i className="fas fa-play"></i>Play
						</button>
						<button>
							<i className="fas fa-info-circle"></i>Info
						</button>
						<button>
							<i className="fas fa-times"></i>Remove
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

const MyListScreen = () => {
	return (
		<div className="myListScreen">
			<div className="myList_rowPosters">
				<IndividualMovie src={LoginPoster2} />
				<IndividualMovie src={LoginPoster3} />
				<IndividualMovie src={LoginPoster3} />
				<IndividualMovie src={LoginPoster3} />
				<IndividualMovie src={LoginPoster3} />
				<IndividualMovie src={LoginPoster3} />
				<IndividualMovie src={LoginPoster3} />
			</div>
		</div>
	);
};

export default MyListScreen;
