import React from 'react';
import FeaturedMovie from '../components/FeaturedMovie';
import HomeRow from '../components/HomeRow';
import '../styles/HomeScreen.css';
import FeaturedBanner from '../components/FeaturedBanner';

const HomeScreen = () => {
	return (
		<div className="homeScreen">
			<FeaturedMovie />
			<div className="homeScreen_rows">
				<FeaturedBanner />
				<HomeRow />
				<HomeRow />
				<HomeRow />
				<HomeRow />
				<HomeRow />
			</div>
		</div>
	);
};

export default HomeScreen;
