import React from 'react';
import '../styles/FeaturedBanner.css';
import InfoIcon from '@material-ui/icons/Info';
import RectangleButton from './RectangleButton';
import AddIcon from '@material-ui/icons/Add';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const FeaturedBanner = () => {
	return (
		<div className="featuredBanner">
			<h1 className="banner_title">Movie Name</h1>
			<h2>Movie release Date</h2>
			<h1 className="banner_description">Description</h1>
			<div className="rating">Ratings</div>
			<div className="banner_buttons">
				<button>
					<RectangleButton Icon={PlayArrowIcon} title="Play" />
				</button>
				<button>
					<RectangleButton Icon={AddIcon} title="My List" />
				</button>
				<InfoIcon className="banner_button3" />
			</div>
		</div>
	);
};

export default FeaturedBanner;
