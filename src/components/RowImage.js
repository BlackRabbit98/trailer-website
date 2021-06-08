import React from 'react';
import '../styles/RowImage.css';

const RowImage = ({ imgSource }) => {
	return (
		<div>
			<img className="rowImage" src={imgSource} alt="row poster" />
		</div>
	);
};

export default RowImage;
