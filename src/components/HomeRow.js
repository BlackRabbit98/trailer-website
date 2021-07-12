import React, { useEffect, useRef, useState } from 'react';
import '../styles/HomeRow.css';
import axios from '../axios';
import { Grow } from '@material-ui/core';
import ModalVideo from 'react-modal-video';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getUserDetails } from '../actions/userActions';
import db from '../utils/firebase';
import { toast } from 'react-toastify';
import MovieInfo from './MovieInfo';

const HomeRow = ({ title, fetchUrl, type }) => {
	const [movies, setMovies] = useState([]);
	const [videoId, setVideoId] = useState([]);
	const [playing, setPlaying] = useState(false);
	const [showMovieInfo, setShowMovieInfo] = useState(false);
	const [movieData, setMovieData] = useState([]);

	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDetails = useSelector((state) => state.userDetails);
	const { user } = userDetails;

	const closeMovieInfoBox = () => {
		setShowMovieInfo(false);
	};
	const addToList = async (movieId) => {
		console.log('You clicked add to list');
		try {
			if (user.favMovies.length < Number(user.limit)) {
				if (!user.favMovies) {
					await db
						.collection('movies')
						.doc(userInfo.uid)
						.set({
							favMovies: [movieId],
							limit: user.limit || 10,
						});

					dispatch(getUserDetails());

					toast.success('🥰 Movie added to your list!', {
						position: 'top-center',
						autoClose: 2500,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
				} else if (!user.favMovies?.includes(movieId)) {
					await db
						.collection('movies')
						.doc(userInfo.uid)
						.set({
							favMovies: [...user.favMovies, movieId],
							limit: user.limit || 10,
						});

					dispatch(getUserDetails());

					toast.success('🥰 Movie added to your list!', {
						position: 'top-center',
						autoClose: 2500,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
				}
			} else {
				toast.error('🙏 Upgrade your plan for more!', {
					position: 'top-center',
					autoClose: 2500,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			}
		} catch (error) {
			console.log('Error occured', error);
		}
	};

	const subtractFromList = async (movieId) => {
		console.log('You clicked add to list');
		try {
			if (user.favMovies && user.favMovies.includes(movieId)) {
				await db
					.collection('movies')
					.doc(userInfo.uid)
					.set({
						favMovies: user.favMovies.filter(
							(item) => item !== movieId
						),
						limit: user.limit || 10,
					});

				dispatch(getUserDetails());

				toast.info('⛔ Movie removed from your list!', {
					position: 'top-center',
					autoClose: 2500,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			} else {
				console.log('Not in the list');
			}
		} catch (error) {
			console.log('Error occured', error);
		}
	};

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
			if (requested.data?.results.length < 1) {
				setVideoId({
					site: 'YouTube',
					key: 'LMlCN6_vUvs',
				});
			} else {
				setVideoId(requested.data?.results[0]);
			}
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

			{showMovieInfo && (
				<MovieInfo
					movie={movieData}
					closeMovieInfoHandler={closeMovieInfoBox}
				/>
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
								<div onClick={() => trailer(movie?.id)}>
									<i className="fas fa-play"></i>
								</div>
								{user.favMovies ? (
									user.favMovies.includes(movie?.id) ? (
										<div
											className="unfav-icon"
											onClick={() =>
												subtractFromList(movie?.id)
											}>
											<i className="fas fa-minus"></i>
										</div>
									) : (
										<div
											onClick={() =>
												addToList(movie?.id)
											}>
											<i className="fas fa-plus"></i>
										</div>
									)
								) : (
									<div onClick={() => addToList(movie?.id)}>
										<i className="fas fa-plus"></i>
									</div>
								)}
								<div
									onClick={() => {
										setMovieData(movie);
										setShowMovieInfo(true);
									}}>
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
