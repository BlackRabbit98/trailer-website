import axios from '../axios';
import React from 'react';
import { useEffect, useState } from 'react';
import '../styles/MovieInfo.css';
import { Grow } from '@material-ui/core';
import ModalVideo from 'react-modal-video';
import requests from '../Requests';
import RectangleButton from './RectangleButton';
import AddIcon from '@material-ui/icons/Add';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Rating from './Rating';

const MovieInfo = ({ movie: movies, closeMovieInfoHandler }) => {
	const [movie, setMovie] = useState([]);
	const [videoId, setVideoId] = useState([]);
	const [playing, setPlaying] = useState(false);

	console.log('movie:', movie);
	useEffect(() => {
		//console.log('useEffect 1 running');
		async function fetchData() {
			const request = await axios.get(requests.fetchNetflixOriginals);
			const randomNum = Math.floor(
				Math.random() * (request.data.results.length - 1)
			);
			setMovie(request.data.results[randomNum || 0]);
			return request;
		}
		fetchData();
	}, []);

	const API_KEY = 'c7eb936e1918da481517817655a9e9db';

	const trailer = async (id) => {
		setPlaying(false);
		async function playTrailer(id) {
			const requested = await axios.get(
				`/tv/${id}/videos?api_key=${API_KEY}&append_to_response=videos`
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

	const truncate = (string, n) => {
		return string?.length > n ? string.substr(0, n - 1) + '...' : string;
	};
	const numMod = (num) => {
		const rem = num % 1;
		if (rem < 0.5) {
			return Math.floor(num);
		} else {
			return Math.floor(num) + 0.5;
		}
	};

	return (
		<div className="movieInfo__containerMain">
			<div className="movieInfo__modal" />

			<button
				className="movieInfo__cancel"
				onClick={() => closeMovieInfoHandler()}>
				<i className="fas fa-times"></i>
			</button>

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

			{movie && movie.backdrop_path && (
				<div
					className="movieInfo_container"
					style={{
						backgroundSize: 'cover',
						backgroundImage: `url("https://image.tmdb.org/t/p/original/${movies?.backdrop_path}")`,
						backgroundPosition: 'top',
						backgroundRepeat: 'no-repeat',
					}}>
					<div className="movieInfo_contentsContainer">
						<div className="movieInfo_contents">
							<p className="movieInfo_title">
								{movies?.title ||
									movies?.name ||
									movies?.original_name}
							</p>
							<p className="movieInfo_description">
								{truncate(`${movies?.overview}`, 150)}
							</p>
							<div className="rating">
								<Rating
									value={movies.vote_average / 2}
									text={`${numMod(
										movies.vote_average / 2
									)} stars`}
								/>
							</div>
							<div className="movieInfo_buttons">
								<button
									onClick={() => trailer(movies.id)}
									className="play_button">
									<RectangleButton
										Icon={PlayArrowIcon}
										title="Play"
									/>
								</button>
								<button className="mylist_button">
									<RectangleButton
										Icon={AddIcon}
										title="My List"
									/>
								</button>
							</div>
							<div className="directorInfo">
								<p>
									{movies?.title ||
										movies?.name ||
										movies?.original_name}
								</p>
							</div>
						</div>

						<div className="bottomContents">
							<div className="trailersList">
								<div className="trailerList_left">
									<i className="fas fa-play"></i>
								</div>
								<div className="trailerList_middle">
									<i className="fas fa-play"></i>
								</div>
								<div className="trailerList_right">
									<i className="fas fa-play"></i>
								</div>
							</div>

							<div className="castInfo">
								<div className="castInfo_sidebar" />
								<p className="castInfo_title">Starring Cast</p>
								<p>
									dhgd, hgdjjf, hgdhgf, dgfhdgf, dgddg, hgdg
									dhgd, hgdjjf, hgdhgf, dgfhdgf, dgddg, hgdg
								</p>
							</div>
						</div>
					</div>
					<div className="movieInfo--fadeBottom" />
				</div>
			)}
		</div>
	);
};
export default MovieInfo;
