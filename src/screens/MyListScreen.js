import React from 'react';
import '../styles/MyListScreen.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../axios';
import { useEffect } from 'react';
import { getUserDetails } from '../actions/userActions';
import { toast } from 'react-toastify';
import db from '../utils/firebase';
import Rating from '../components/Rating';
import MovieInfo from '../components/MovieInfo';
import { Grow } from '@material-ui/core';
import ModalVideo from 'react-modal-video';

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

const IndividualMovie = ({
	src = '',
	title,
	year,
	description,
	rating,
	id,
	showInfo,
}) => {
	const [showMovieDetails, setShowMovieDetails] = useState(false);

	const dispatch = useDispatch();

	const userDetails = useSelector((state) => state.userDetails);
	const { user } = userDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const [videoId, setVideoId] = useState([]);
	const [playing, setPlaying] = useState(false);

	const trailer = async (id) => {
		setPlaying(false);
		//console.log('Playing trailer');
		async function playTrailer(id) {
			const requested = await axios.get(
				`/movie/${id}/videos?api_key=${API_KEY}&append_to_response=videos`
			);
			//console.log('Requested trailer: ', requested);
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

	const subtractFromList = async () => {
		const movieId = id;
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

	useEffect(() => {
		if (videoId && videoId.site && videoId.site === 'YouTube') {
			setPlaying(true);
		}
	}, [videoId]);

	return (
		<div className="myList_row">
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

			{showMovieDetails && (
				<div
					onClick={(e) => {
						if (e.target === e.currentTarget) {
							//console.log(e.target, e.currentTarget);
							setShowMovieDetails(!showMovieDetails);
						}
					}}
					className="myList_row_modal"
				/>
			)}
			<img
				className={`myList_img ${showMovieDetails && 'big-poster-img'}`}
				onClick={() => setShowMovieDetails(!showMovieDetails)}
				src={src}
				alt=""
			/>

			{showMovieDetails && (
				<div className="myList_rowEffects">
					<h2>
						{title} ({year})
					</h2>
					<p>{truncate(`${description}`, 150)}</p>
					<Rating value={rating} text={`${numMod(rating)} stars`} />
					<div className="rowEffects_button">
						<button onClick={() => trailer(id)}>
							<i className="fas fa-play"></i>Play
						</button>
						<button onClick={() => showInfo()}>
							<i className="fas fa-info-circle"></i>
							Info
						</button>
						<button
							className="unfav-icon"
							onClick={() => subtractFromList(id)}>
							<i className="fas fa-minus"></i>Remove
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

const API_KEY = 'c7eb936e1918da481517817655a9e9db';
const baseUrl = 'https://image.tmdb.org/t/p/w500';

const GetMovieData = ({ id, addMovieData }) => {
	const [movieData, setMovieData] = useState(null);

	const getData = async (movieId) => {
		try {
			const { data } = await axios.get(
				`/tv/${movieId}?api_key=${API_KEY}&language=en-US`
			);
			//console.log('Requested Data: ', data);
			setMovieData(data);
		} catch (error) {
			try {
				const { data } = await axios.get(
					`/movie/${movieId}?api_key=${API_KEY}&language=en-US`
				);
				//console.log('Requested Data: ', data);
				setMovieData(data);
			} catch (error) {
				//console.log(error);
			}
		}
	};

	const showInfo = () => {
		addMovieData(movieData);
	};

	useEffect(() => {
		getData(id);
	}, [id]);

	return (
		<IndividualMovie
			src={`${baseUrl}${movieData?.poster_path}`}
			title={movieData?.original_title || movieData?.name}
			year={
				movieData?.release_date?.split('-')[0] ||
				movieData?.last_air_date?.split('-')[0]
			}
			description={movieData?.overview}
			rating={movieData?.vote_average / 2}
			id={id}
			showInfo={showInfo}
		/>
	);
};

const MyListScreen = () => {
	const dispatch = useDispatch();
	const [showMovieInfo, setShowMovieInfo] = useState(false);
	const [movieData, setMovieData] = useState([]);

	const closeMovieInfoBox = () => {
		setShowMovieInfo(false);
	};

	const addMovieData = (movieInfo) => {
		setMovieData(movieInfo);
		setShowMovieInfo(true);
	};

	const userDetails = useSelector((state) => state.userDetails);
	const { user } = userDetails;

	useEffect(() => {
		dispatch(getUserDetails());
	}, [dispatch]);

	return (
		<div className="myListScreen">
			{showMovieInfo && (
				<MovieInfo
					movie={movieData}
					closeMovieInfoHandler={closeMovieInfoBox}
				/>
			)}
			<div className="myList_rowPosters">
				{user.favMovies &&
					user.favMovies?.map((item, idx) => {
						return (
							<GetMovieData
								key={idx}
								id={item}
								addMovieData={addMovieData}
							/>
						);
					})}
			</div>
		</div>
	);
};

export default MyListScreen;
