import axios from '../axios';
import React from 'react';
import { useEffect, useState } from 'react';
import '../styles/FeaturedMovie.css';
import { Grow } from '@material-ui/core';
import ModalVideo from 'react-modal-video';
import requests from '../Requests';
import InfoIcon from '@material-ui/icons/Info';
import RectangleButton from './RectangleButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Rating from './Rating';
import MovieInfo from './MovieInfo';
import { getUserDetails } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import db from '../utils/firebase';

const FeaturedMovie = () => {
	const [movies, setMovies] = useState([]);
	const [videoId, setVideoId] = useState([]);
	const [playing, setPlaying] = useState(false);
	const [showMovieInfo, setShowMovieInfo] = useState(false);
	const [movieData, setMovieData] = useState([]);
	const dispatch = useDispatch();

	const closeMovieInfoBox = () => {
		setShowMovieInfo(false);
	};

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDetails = useSelector((state) => state.userDetails);
	const { user } = userDetails;

	useEffect(() => {
		////console.log('useEffect 1 running');
		async function fetchData() {
			const request = await axios.get(requests.fetchNetflixOriginals);
			const randomNum = Math.floor(
				Math.random() * (request.data.results.length - 1)
			);
			setMovies(request.data.results[randomNum || 0]);
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

	const addToList = async (movieId) => {
		//console.log('You clicked add to list');
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
			//console.log('Error occured', error);
		}
	};

	const subtractFromList = async (movieId) => {
		//console.log('You clicked add to list');
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
				//console.log('Not in the list');
			}
		} catch (error) {
			//console.log('Error occured', error);
		}
	};

	return (
		<div>
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

			{movies && movies.backdrop_path && (
				<header
					className="featured_container"
					style={{
						backgroundSize: 'cover',
						backgroundImage: `url("https://image.tmdb.org/t/p/original/${movies?.backdrop_path}")`,
						backgroundPosition: 'top',
						backgroundRepeat: 'no-repeat',
					}}>
					<div className="featuredBanner">
						<div className="featuredBanner_contents">
							<p className="banner_title">
								{movies?.title ||
									movies?.name ||
									movies?.original_name}
							</p>
							<p className="banner_description">
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
							<div className="banner_buttons">
								<button
									onClick={() => trailer(movies.id)}
									className="play_button">
									<RectangleButton
										Icon={PlayArrowIcon}
										title="Play"
									/>
								</button>
								{user.favMovies ? (
									user.favMovies.includes(movies?.id) ? (
										<button
											onClick={() =>
												subtractFromList(movies?.id)
											}
											className="mylist_button unfav-icon">
											<RectangleButton
												Icon={RemoveIcon}
												title="My List"
											/>
										</button>
									) : (
										<button
											onClick={() =>
												addToList(movies?.id)
											}
											className="mylist_button">
											<RectangleButton
												Icon={AddIcon}
												title="My List"
											/>
										</button>
									)
								) : (
									<button
										onClick={() => addToList(movies?.id)}
										className="mylist_button">
										<RectangleButton
											Icon={AddIcon}
											title="My List"
										/>
									</button>
								)}
								<InfoIcon
									className="info_button"
									onClick={() => {
										setMovieData(movies);
										setShowMovieInfo(true);
									}}
								/>
							</div>
						</div>
					</div>
					<div className="banner--fadeBottom" />
				</header>
			)}
		</div>
	);
};

export default FeaturedMovie;
