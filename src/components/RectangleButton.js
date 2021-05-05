import React from 'react';
import '../styles/RectangleButton.css';

function RectangleButton({ Icon, title }) {
	return (
		<div className="rectangleButton">
			<Icon />
			<p>{title}</p>
		</div>
	);
}

export default RectangleButton;
