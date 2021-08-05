import React from 'react';
import PacmanLoader from 'react-spinners/PacmanLoader';
import '../styles/LoadingScreen.css';

function LoadingScreen() {
	return (
		<div className="loadingContainer">
			<PacmanLoader
				color="#02ffd1"
				loading={true}
				size={50}
				width={300}
			/>
		</div>
	);
}

export default LoadingScreen;
