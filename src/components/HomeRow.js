import React from 'react';
import '../styles/HomeRow.css';
import RowImage from './RowImage';
import RowPoster from '../assets/RowPoster.png';
import RowPoster1 from '../assets/RowPoster1.png';
import RowPoster2 from '../assets/RowPoster2.png';
import RowPoster3 from '../assets/RowPoster3.png';
import RowPoster4 from '../assets/RowPoster4.png';

const HomeRow = () => {
	const images = [RowPoster, RowPoster1, RowPoster2, RowPoster3, RowPoster4];
	return (
		<div className="homeRow">
			<h2>Row title</h2>
			<div className="row">
				{images.map((movie) => (
					<RowImage imgSource={movie} />
				))}

				{images.map((movie) => (
					<RowImage imgSource={movie} />
				))}
			</div>
		</div>
	);
};

export default HomeRow;
