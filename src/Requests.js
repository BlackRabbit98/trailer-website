const API_KEY = 'c7eb936e1918da481517817655a9e9db';

const requests = {
	fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
	fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213&language=en-US`,
	fetchAnimation: `/discover/movie?api_key=${API_KEY}&with_genres=16`,
	fetchScifi: `/discover/movie?api_key=${API_KEY}&with_genres=878`,
	fetchReality: `/discover/tv?api_key=${API_KEY}&with_genres=10764&language=en-US`,
	fetchDrama: `/discover/tv?api_key=${API_KEY}&with_genres=18`,
	fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
	fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
	fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
	fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
	fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
	fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
};

export default requests;