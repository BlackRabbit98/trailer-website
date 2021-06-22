import React, { useEffect } from 'react';
// import RowImage from './RowImage';
// import RowPoster from '../assets/RowPoster.png';
import '../styles/TvShowsRowImages.css';
import { useState } from 'react';
import axios from '../axios';
import { Grow } from '@material-ui/core';
import ModalVideo from 'react-modal-video';

const TvShowsRowImages = ({ data, start, type }) => {
	const [movies, setMovies] = useState([]);
	

	const RowImage = (imgSource, id) => (
		<div className="imageBox">
			<img className="RowImage" src={imgSource} alt="" />
			<div className="imageBackdrop">
				<div className="imageBackdropButtons">
					<div onClick={() => trailer(id)}>
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

	return (
		<div className="tvShowsRowsPosters">
			{videoId && playing && videoId.site === 'YouTube' && (
				<Grow in={playing} mountOnEnter unmountOnExit>
					<ModalVideo
						channel="youtube"
						isOpen="true"
						videoId={videoId.key}
						onClose={() => setPlaying(false)}
					/>
				</Grow>
			)}
			<div className="leftRowPosters">
				<div className="leftRowPosters__top">
					<RowImage
						imgSource={`${baseUrl}${movies[0]?.poster_path}`}
						id={movies[0]?.id}
					/>
					<RowImage
						imgSource={`${baseUrl}${movies[1]?.poster_path}`}
						id={movies[0]?.id}
					/>
					<RowImage
						imgSource={`${baseUrl}${movies[2]?.poster_path}`}
						id={movies[0]?.id}
					/>
				</div>
				<div className="leftRowPosters__bottom">
					<RowImage
						imgSource={`${baseUrl}${movies[3]?.poster_path}`}
						id={movies[0]?.id}
					/>
					<RowImage
						imgSource={`${baseUrl}${movies[4]?.poster_path}`}
						id={movies[0]?.id}
					/>
					<RowImage
						imgSource={`${baseUrl}${movies[5]?.poster_path}`}
						id={movies[0]?.id}
					/>
				</div>
			</div>
			<div className="rightRowPosters">
				<img
					src={`${baseUrl}${movies[6]?.poster_path}`}
					id={movies[0]?.id}
					alt=""
				/>
			</div>
		</div>
	);
};

export default TvShowsRowImages;
