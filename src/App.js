import './App.css';
import HomeScreen from './screens/HomeScreen';
import TvShowsScreen from './screens/TvShowsScreen';
import MoviesScreen from './screens/MoviesScreen';
import NewScreen from './screens/NewScreen';
import MyListScreen from './screens/MyListScreen';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import MovieInfo from './components/MovieInfo';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';

function App() {
	return (
		<div className="App">
			<Router>
				<Header />
				<Switch>
					<Route exact path="/">
						<HomeScreen />
					</Route>
					<Route exact path="/tvshows">
						<TvShowsScreen />
					</Route>
					<Route exact path="/movies">
						{/*<MovieScreen />*/}
						{/*<MovieInfo />*/}
						{<ProfileScreen />}
					</Route>
					<Route exact path="/new">
						{/*<NewScreen />*/}
						<LoginScreen />
					</Route>
					<Route exact path="/mylist">
						<MyListScreen />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
