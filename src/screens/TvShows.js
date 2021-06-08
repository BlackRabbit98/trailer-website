import React from 'react';
import RectangleButton from '../components/RectangleButton';
import TvShowsRows from '../components/TvShowsRows';
import '../styles/TvShows.css';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const TvShows = () => {
	return (
		<div className="tvShows">
			<button className="tvShowsButton">
				<RectangleButton Icon={PlayArrowIcon} title="Genres" />
			</button>

			<TvShowsRows title="Bhalh Blha" />
			<TvShowsRows />
		</div>
	);
};

export default TvShows;
