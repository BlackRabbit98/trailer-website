import React from 'react';
import FeaturedMovie from '../components/FeaturedMovie';
import HomeRow from '../components/HomeRow';
import '../styles/HomeScreen.css';
import FeaturedBanner from '../components/FeaturedBanner';
import requests from '../Requests';

const HomeScreen = () => {
	return (
		<div className="homeScreen">
			<FeaturedMovie />
			<div className="homeScreen_rows">
				<FeaturedBanner />
				<HomeRow
					title="Trending Now"
					type="movie"
					fetchUrl={requests.fetchTrending}
				/>
				<HomeRow
					title="Animation"
					type="movie"
					fetchUrl={requests.fetchAnimation}
				/>
				<HomeRow
					title="Science Fiction"
					type="movie"
					fetchUrl={requests.fetchScifi}
				/>
				<HomeRow
					title="Reality Shows"
					type="tv"
					fetchUrl={requests.fetchReality}
				/>
				<HomeRow
					title="Dramas"
					type="tv"
					fetchUrl={requests.fetchDrama}
				/>
			</div>
		</div>
	);
};

export default HomeScreen;
