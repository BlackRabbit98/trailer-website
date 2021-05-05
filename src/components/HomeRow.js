import React from 'react';
import '../styles/HomeRow.css';
import RowPoster from '../assets/RowPoster.png';

const HomeRow = () => {
	return (
		<div className="homeRow">
			<h2>Row title</h2>
			<div className="rowImages">
				<img className="poster1" src={RowPoster} alt="row poster" />
				<img className="poster2" src={RowPoster} alt="row poster" />
				<img className="poster3" src={RowPoster} alt="row poster" />
				<img className="poster4" src={RowPoster} alt="row poster" />
				<img className="poster5" src={RowPoster} alt="row poster" />
				<img className="poster3" src={RowPoster} alt="row poster" />
				<img className="poster4" src={RowPoster} alt="row poster" />
				<img className="poster5" src={RowPoster} alt="row poster" />
			</div>
		</div>
	);
};

export default HomeRow;
