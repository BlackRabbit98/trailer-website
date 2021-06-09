import React from 'react';
import '../styles/FeaturedBanner.css';
import InfoIcon from '@material-ui/icons/Info';
import RectangleButton from './RectangleButton';
import AddIcon from '@material-ui/icons/Add';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const FeaturedBanner = () => {
	return (
		<div className="featuredBanner">
			<p className="banner_title">Movie Name (Date)</p>
			<h2 className="banner_description">Description </h2>
			<div className="rating">Ratings</div>
			<div className="banner_buttons">
				<button className="play_button">
					<RectangleButton Icon={PlayArrowIcon} title="Play" />
				</button>
				<button className="mylist_button">
					<RectangleButton Icon={AddIcon} title="My List" />
				</button>
				<InfoIcon className="info_button" />
			</div>
		</div>
	);
};

export default FeaturedBanner;
