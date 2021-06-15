import React, { useEffect, useState } from 'react';
import '../styles/HomeRow.css';
import axios from '../axios';

const HomeRow = ({ title, fetchUrl }) => {
	const [movies, setMovies] = useState([]);

	const baseUrl = 'https://image.tmdb.org/t/p/w500';

	useEffect(() => {
		async function fetchData() {
			const request = await axios.get(fetchUrl);
			setMovies(request.data.results);
			return request;
		}
		fetchData();
	}, [fetchUrl]);

	return (
		<div className="homeRow">
			<h2>{title}</h2>

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
								<button>
									<p>A</p>
								</button>
								<button>
									<p>A</p>
								</button>
								<button>
									<p>A</p>
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default HomeRow;
