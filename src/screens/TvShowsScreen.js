import React from 'react';
import RectangleButton from '../components/RectangleButton';
import TvShowsRows from '../components/TvShowsRows';
import '../styles/TvShowsScreen.css';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import requests from '../Requests';
import { useState } from 'react';
import { useEffect } from 'react';

const TvShows = () => {
	const [curLoc, setCurLoc] = useState(null);
	const [showGenre, setShowGenre] = useState(false);

	useEffect(() => {
		let elem = document.getElementById(curLoc);
		if (elem) {
			elem.scrollIntoView({ behavior: 'smooth' });
		}
		return () => {
			setCurLoc(null);
		};
	}, [curLoc]);

	const options = ['Drama', 'Netflix originals', 'Reality shows'];

	return (
		<div className="tvShows">
			<div className="tvShows__genreSelector">
				<button
					className="tvShowsButton"
					onClick={() => setShowGenre(!showGenre)}>
					<RectangleButton Icon={PlayArrowIcon} title="Genres" />
				</button>
				{showGenre && (
					<div className="tvShows__genres">
						{options.map((opt) => (
							<p
								onClick={() => {
									setCurLoc(opt);
									setShowGenre(false);
								}}>
								{opt}
							</p>
						))}
					</div>
				)}
			</div>

			<TvShowsRows
				title="Drama"
				type="tv"
				fetchUrl={requests.fetchDrama}
			/>
			<TvShowsRows
				title="Netflix originals"
				type="tv"
				fetchUrl={requests.fetchNetflixOriginals}
			/>
			<TvShowsRows
				title="Reality shows"
				type="tv"
				fetchUrl={requests.fetchReality}
			/>
		</div>
	);
};

export default TvShows;
