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
	removeFromList,
}) => {
	const [showMovieDetails, setShowMovieDetails] = useState(false);

	return (
		<div className="myList_row">
			{showMovieDetails && (
				<div
					onClick={(e) => {
						if (e.target === e.currentTarget) {
							console.log(e.target, e.currentTarget);
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
						<button>
							<i className="fas fa-play"></i>Play
						</button>
						<button>
							<i className="fas fa-info-circle"></i>Info
						</button>
						<button onClick={() => removeFromList()}>
							<i className="fas fa-times"></i>Remove
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

const API_KEY = 'c7eb936e1918da481517817655a9e9db';
const baseUrl = 'https://image.tmdb.org/t/p/w500';

const GetMovieData = ({ id }) => {
	const [movieData, setMovieData] = useState(null);
	const dispatch = useDispatch();

	const userDetails = useSelector((state) => state.userDetails);
	const { user } = userDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const getData = async (movieId) => {
		try {
			const { data } = await axios.get(
				`/tv/${movieId}?api_key=${API_KEY}&language=en-US`
			);
			console.log('Requested Data: ', data);
			setMovieData(data);
		} catch (error) {
			try {
				const { data } = await axios.get(
					`/movie/${movieId}?api_key=${API_KEY}&language=en-US`
				);
				console.log('Requested Data: ', data);
				setMovieData(data);
			} catch (error) {
				console.log(error);
			}
		}
	};

	const subtractFromList = async () => {
		const movieId = id;
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

	useEffect(() => {
		getData(id);
	}, [id]);

	return (
		<IndividualMovie
			removeFromList={subtractFromList}
			src={`${baseUrl}${movieData?.poster_path}`}
			title={movieData?.original_title || movieData?.name}
			year={
				movieData?.release_date?.split('-')[0] ||
				movieData?.last_air_date?.split('-')[0]
			}
			description={movieData?.overview}
			rating={movieData?.vote_average / 2}
		/>
	);
};

const MyListScreen = () => {
	const dispatch = useDispatch();

	const userDetails = useSelector((state) => state.userDetails);
	const { user } = userDetails;

	useEffect(() => {
		dispatch(getUserDetails());
	}, [dispatch]);

	return (
		<div className="myListScreen">
			<div className="myList_rowPosters">
				{user.favMovies &&
					user.favMovies?.map((item, idx) => {
						return <GetMovieData key={idx} id={item} />;
					})}
			</div>
		</div>
	);
};

export default MyListScreen;
