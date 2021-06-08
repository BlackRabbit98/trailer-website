import React from 'react';
import RowImage from './RowImage';
import RowPoster from '../assets/RowPoster.png';
import '../styles/TvShowsRow.css';

const TvShowsRowImages = () => {
	return (
		<div className="tvShowsRowsPosters">
			<div className="leftRowPosters">
				<div className="leftRowPosters__top">
					<RowImage imgSource={RowPoster} />
					<RowImage imgSource={RowPoster} />
					<RowImage imgSource={RowPoster} />
				</div>
				<div className="leftRowPosters__bottom">
					<RowImage imgSource={RowPoster} />
					<RowImage imgSource={RowPoster} />
					<RowImage imgSource={RowPoster} />
				</div>
			</div>
			<div className="rightRowPosters">
				<img src={RowPoster} alt="" />
			</div>
		</div>
	);
};

export default TvShowsRowImages;
