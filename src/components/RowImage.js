import React from 'react';
import '../styles/RowImage.css';

const RowImage = ({ imgSource, handleClick }) => {
	return (
		<div className="imageBox">
			<img loading="lazy" className="RowImage" src={imgSource} alt="" />
			<div className="imageBackdrop">
				<div className="imageBackdropButtons">
					<div onClick={handleClick}>
						<i className="fas fa-play"></i>
					</div>
					<div>
						<i className="fas fa-plus"></i>
					</div>
					<div>
						<i className="fas fa-info-circle"></i>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RowImage;
