import React from 'react';
import FeaturedMovie from '../components/FeaturedMovie';
import Header from '../components/Header';
import HomeRow from '../components/HomeRow';
import '../styles/HomeScreen.css';
import FeaturedBanner from '../components/FeaturedBanner';

const HomeScreen = () => {
	return (
		<div className="homeScreen">
			<Header />
			<FeaturedMovie />
			<div className="homeScreen_rows">
				<FeaturedBanner />
				<HomeRow />
				<HomeRow />
			</div>
		</div>
	);
};

export default HomeScreen;
