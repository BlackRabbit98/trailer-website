import React, { useEffect, useState } from 'react';
import '../styles/HomeRow.css';
import axios from '../axios';
import { Grow } from '@material-ui/core';
import ModalVideo from 'react-modal-video';

const HomeRow = ({ title, fetchUrl, type }) => {
	const [movies, setMovies] = useState([]);
	const [videoId, setVideoId] = useState([]);
	const [playing, setPlaying] = useState(false);

	const baseUrl = 'https://image.tmdb.org/t/p/w500';

	useEffect(() => {
		async function fetchData() {
			const request = await axios.get(fetchUrl);
			setMovies(request.data.results);
			return request;
		}
		fetchData();
	}, [fetchUrl]);
	const API_KEY = 'c7eb936e1918da481517817655a9e9db';

	const trailer = async (id) => {
		setPlaying(false);
		async function playTrailer(id) {
			const requested = await axios.get(
				`/${type}/${id}/videos?api_key=${API_KEY}&append_to_response=videos`
			);
			setVideoId(requested.data?.results[0]);
			return requested;
		}
		playTrailer(id);
	};

	useEffect(() => {
		if (videoId && videoId.site && videoId.site === 'YouTube') {
			setPlaying(true);
		}
	}, [videoId]);

	return (
		<div className="homeRow">
			<h2>{title}</h2>
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

			<div className="row">
				{movies?.map((movie, idx) => (
					<div className="imageBox" key={idx}>
						<img
							loading="lazy"
							className="RowImage"
							src={`${baseUrl}${movie.poster_path}`}
							alt={movie.name}
						/>
						<div className="imageBackdrop">
							<div className="imageBackdropButtons">
								<div onClick={() => trailer(movie.id)}>
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
				))}
			</div>
		</div>
	);
};

export default HomeRow;
