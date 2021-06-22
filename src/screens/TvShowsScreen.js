import React from 'react';
import RectangleButton from '../components/RectangleButton';
import TvShowsRows from '../components/TvShowsRows';
import '../styles/TvShowsScreen.css';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import requests from '../Requests';

const TvShows = () => {
	return (
		<div className="tvShows">
			<button className="tvShowsButton">
				<RectangleButton Icon={PlayArrowIcon} title="Genres" />
			</button>
			<TvShowsRows
				title="Reality shows"
				type="tv"
				fetchUrl={requests.fetchTrending}
			/>
			{/* <TvShowsRows
				title="Drama"
				type="tv"
				fetchUrl={requests.fetchAnimation}
			/>
			<TvShowsRows
				title="Science Fiction"
				type="movie"
				fetchUrl={requests.fetchScifi}
			/> */}
		</div>
	);
};

export default TvShows;
