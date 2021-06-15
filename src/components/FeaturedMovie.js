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
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Rating from './Rating';

const FeaturedMovie = () => {
	const [movies, setMovies] = useState([]);
	const [videoId, setVideoId] = useState([]);
	const [playing, setPlaying] = useState(false);

	useEffect(() => {
		//console.log('useEffect 1 running');
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
								<button className="mylist_button">
									<RectangleButton
										Icon={AddIcon}
										title="My List"
									/>
								</button>
								<InfoIcon className="info_button" />
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
