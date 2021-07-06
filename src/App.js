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
import { useDispatch } from 'react-redux';
import { login, logout, verifyUser } from './actions/userActions';
import { useEffect } from 'react';
import { auth } from './utils/firebase';
import { useState } from 'react';
import { USER_LOGIN_SUCCESS } from './constants/userConstants';
import { useSelector } from 'react-redux';
import LoadingScreen from './components/LoadingScreen';

function App() {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		setLoading(true);
		const persistLogin = auth.onAuthStateChanged((user) => {
			if (user) {
				setLoading(false);
				dispatch({
					type: USER_LOGIN_SUCCESS,
					payload: user,
				});
			} else {
				setLoading(false);
				dispatch(logout());
			}
		});

		return persistLogin;
	}, [dispatch]);
	return (
		<div className="App">
			<Router>
				{loading ? (
					<LoadingScreen />
				) : !userInfo ? (
					<Route path="/" component={LoginScreen} />
				) : (
					<>
						<Header />
						<Switch>
							<Route exact path="/">
								<HomeScreen />
							</Route>
							<Route exact path="/tvshows">
								<TvShowsScreen />
							</Route>
							<Route exact path="/movies">
								<MoviesScreen />
							</Route>
							<Route exact path="/new">
								<NewScreen />
							</Route>
							<Route exact path="/mylist">
								<MyListScreen />
							</Route>
							<Route exact path="/myaccount">
								<ProfileScreen />
							</Route>
						</Switch>
					</>
				)}
			</Router>
		</div>
	);
}

export default App;
