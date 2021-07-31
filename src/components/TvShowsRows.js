import React from 'react';
import '../styles/TvShowsRow.css';
import { useState, useEffect } from 'react';
import axios from '../axios';
import '../styles/TvShowsRowImages.css';
import '../styles/RowImage.css';
import { Grow } from '@material-ui/core';
import ModalVideo from 'react-modal-video';
import { useSelector } from 'react-redux';
import db from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { getUserDetails } from '../actions/userActions';
import { toast } from 'react-toastify';
import MovieInfo from './MovieInfo';

const TvShowsRows = ({ title, fetchUrl, type }) => {
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

	const baseUrl = 'https://image.tmdb.org/t/p/w500';

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
		if (
			videoId &&
			videoId !== '' &&
			videoId !== null &&
			videoId !== undefined &&
			videoId.site &&
			videoId.site === 'YouTube'
		) {
			setPlaying(true);
		}
	}, [videoId]);

	useEffect(() => {
		async function fetchData() {
			const request = await axios.get(fetchUrl);
			setMovies([...request.data.results]);
			//console.log('MovieData: ', request.data.results);
			return request;
		}
		fetchData();
	}, [fetchUrl]);

	const RowImage = ({
		imgSource = 'https://omegamma.com.au/wp-content/uploads/2017/04/default-image-620x600.jpg',
		id,
		indexVal,
	}) => (
		<div className="imageBox">
			<img className="RowImage" src={imgSource} alt="" />
			<div className="imageBackdrop">
				<div className="imageBackdropButtons">
					<div onClick={() => trailer(id)}>
						<i className="fas fa-play"></i>
					</div>

					{user.favMovies ? (
						user.favMovies.includes(id) ? (
							<div
								className="unfav-icon"
								onClick={() => subtractFromList(id)}>
								<i className="fas fa-minus"></i>
							</div>
						) : (
							<div onClick={() => addToList(id)}>
								<i className="fas fa-plus"></i>
							</div>
						)
					) : (
						<div onClick={() => addToList(id)}>
							<i className="fas fa-plus"></i>
						</div>
					)}
					<div>
						<i
							onClick={() => {
								setMovieData(movies[indexVal]);
								setShowMovieInfo(true);
							}}
							className="fas fa-info-circle"></i>
					</div>
				</div>
			</div>
		</div>
	);

	const TvShowRowStructure = ({ start = 0 }) => (
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
						imgSource={`${baseUrl}${
							movies[start + 0]?.poster_path
						}`}
						id={movies[start + 0]?.id}
						indexVal={start + 0}
					/>
					<RowImage
						imgSource={`${baseUrl}${
							movies[start + 1]?.poster_path
						}`}
						id={movies[start + 1]?.id}
						indexVal={start + 1}
					/>
					<RowImage
						imgSource={`${baseUrl}${
							movies[start + 2]?.poster_path
						}`}
						id={movies[start + 2]?.id}
						indexVal={start + 2}
					/>
				</div>
				<div className="leftRowPosters__bottom">
					<RowImage
						imgSource={`${baseUrl}${
							movies[start + 3]?.poster_path
						}`}
						id={movies[start + 3]?.id}
						indexVal={start + 3}
					/>
					<RowImage
						imgSource={`${baseUrl}${
							movies[start + 4]?.poster_path
						}`}
						id={movies[start + 4]?.id}
						indexVal={start + 4}
					/>
					<RowImage
						imgSource={`${baseUrl}${
							movies[start + 5]?.poster_path
						}`}
						id={movies[start + 5]?.id}
						indexVal={start + 5}
					/>
				</div>
			</div>
			<div className="rightRowPosters">
				<img
					className="rightRowImage"
					src={`${baseUrl}${movies[start + 6]?.poster_path}`}
					alt=""
				/>
				<div className="rightRow_imageBackdrop">
					<div className="rightRow_imageBackdropButtons">
						<div onClick={() => trailer(movies[start + 6]?.id)}>
							<i className="fas fa-play"></i>
						</div>
						{user.favMovies ? (
							user.favMovies.includes(movies[start + 6]?.id) ? (
								<div
									className="unfav-icon"
									onClick={() =>
										subtractFromList(movies[start + 6]?.id)
									}>
									<i className="fas fa-minus"></i>
								</div>
							) : (
								<div
									onClick={() =>
										addToList(movies[start + 6]?.id)
									}>
									<i className="fas fa-plus"></i>
								</div>
							)
						) : (
							<div
								onClick={() =>
									addToList(movies[start + 6]?.id)
								}>
								<i className="fas fa-plus"></i>
							</div>
						)}
						<div
							onClick={() => {
								setMovieData(movies[start + 6]);
								setShowMovieInfo(true);
							}}>
							<i className="fas fa-info-circle"></i>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
	console.log(movies[0]);

	return (
		<div className="tvShowsRow" id={title}>
			{showMovieInfo && (
				<MovieInfo
					movie={movieData}
					closeMovieInfoHandler={closeMovieInfoBox}
					tv={true}
				/>
			)}
			<p>{title}</p>
			<div className="tvShowsRowImages">
				{movies && <TvShowRowStructure start={0} />}
				{movies && <TvShowRowStructure start={7} />}
			</div>
		</div>
	);
};

export default TvShowsRows;
