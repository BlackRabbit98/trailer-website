import React from 'react';
import movie from '../assets/BlackPanther.png';
import '../styles/FeaturedMovie.css'

const FeaturedMovie = () => {
	return (
		<div className="featured_container">
			<img className="featuredImg" src={movie} alt="featured movie" />
			<div className="featured_modal" />
		</div>
	);
};

export default FeaturedMovie;
