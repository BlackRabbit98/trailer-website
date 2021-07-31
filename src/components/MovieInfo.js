import axios from '../axios';
import React from 'react';
import { useEffect, useState } from 'react';
import '../styles/MovieInfo.css';
import { Grow } from '@material-ui/core';
import ModalVideo from 'react-modal-video';
import RectangleButton from './RectangleButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Rating from './Rating';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import db from '../utils/firebase';
import { getUserDetails } from '../actions/userActions';

const MovieInfo = ({ movie: movies, closeMovieInfoHandler, tv = false }) => {
	const [movieTrailers, setMovieTrailers] = useState([]);
	const [videoId, setVideoId] = useState([]);
	const [playing, setPlaying] = useState(false);
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDetails = useSelector((state) => state.userDetails);
	const { user } = userDetails;

	const API_KEY = 'c7eb936e1918da481517817655a9e9db';
	//console.log(movies);
	useEffect(() => {
		////console.log('useEffect 1 running');
		console.log(movies);
		async function fetchData() {
			try {
				if (tv) {
					const { data } = await axios.get(
						`/tv/${movies.id}/videos?api_key=${API_KEY}&append_to_response=videos`
					);
					//console.log(data);
					setMovieTrailers(data.results);
					return data;
				} else {
					const { data } = await axios.get(
						`/movie/${movies.id}/videos?api_key=${API_KEY}&append_to_response=videos`
					);
					if (data.results.length < 1) {
						const { data } = await axios.get(
							`/tv/${movies.id}/videos?api_key=${API_KEY}&append_to_response=videos`
						);
						//console.log(data);
						setMovieTrailers(data.results);
						return data;
					} else {
						//console.log(data);
						setMovieTrailers(data.results);
						return data;
					}
				}
			} catch (error) {
				const { data } = await axios.get(
					`/tv/${movies.id}/videos?api_key=${API_KEY}&append_to_response=videos`
				);
				//console.log(data);
				setMovieTrailers(data.results);
				return data;
			}
		}
		fetchData();
	}, [movies, tv]);

	const trailer = async (id) => {
		setPlaying(false);
		setVideoId(id);
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
		<div className="movieInfo__containerMain">
			<div className="movieInfo__modal" />

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

			{movies && movies.backdrop_path && (
				<div
					className="movieInfo_container"
					style={{
						backgroundSize: 'cover',
						backgroundImage: `url("https://image.tmdb.org/t/p/original/${movies?.backdrop_path}")`,
						backgroundPosition: 'top',
						backgroundRepeat: 'no-repeat',
						borderRadius: '50px',
					}}>
					<button
						className="movieInfo__cancel"
						onClick={() => closeMovieInfoHandler()}>
						<i className="fas fa-times"></i>
					</button>
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
									onClick={() => trailer(movieTrailers[0])}
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
								{movieTrailers.map((tr, idx) => {
									if (idx > 2) return null;
									return (
										<div
											className="trailerList_left"
											onClick={() => trailer(tr)}>
											<img
												src={`https://img.youtube.com/vi/${tr.key}/mqdefault.jpg
`}
												alt=""
											/>
											<i className="fas fa-play"></i>
										</div>
									);
								})}
								{movieTrailers.length < 1 && (
									<div
										className="trailerList_left"
										onClick={() =>
											trailer({
												site: 'YouTube',
												key: 'LMlCN6_vUvs',
											})
										}>
										<img
											src="https://img.youtube.com/vi/LMlCN6_vUvs/mqdefault.jpg"
											alt=""
										/>
										<i className="fas fa-play"></i>
									</div>
								)}
							</div>

							<div className="castInfo">
								<div className="castInfo_sidebar" />
								<p className="castInfo_title">Starring Cast</p>
								<p>
									Casts coming soon! Please check back again.
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
