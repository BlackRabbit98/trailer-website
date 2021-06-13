import React, { useState } from 'react';
import TvShowsRowImages from './TvShowsRowImages';
import '../styles/TvShowsRow.css';

const TvShowsRows = ({ title }) => {

	return (
		<div className="tvShowsRow">
			<p>{title}</p>
			<div className="tvShowsRowImages">
				<TvShowsRowImages />
				<TvShowsRowImages />
			</div>
		</div>
	);
};

export default TvShowsRows;
