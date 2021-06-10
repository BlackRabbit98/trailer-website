import React from 'react';
import RectangleButton from '../components/RectangleButton';
import TvShowsRows from '../components/TvShowsRows';
import '../styles/TvShowsScreen.css';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const TvShows = () => {
	return (
		<div className="tvShows">
			<button className="tvShowsButton">
				<RectangleButton Icon={PlayArrowIcon} title="Genres" />
			</button>
			<TvShowsRows title="Latest Movies" />
			<TvShowsRows title="Top Rated Movies" />
			<TvShowsRows title="Horror Movies" />
		</div>
	);
};

export default TvShows;
