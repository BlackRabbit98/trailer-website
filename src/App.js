import './App.css';
import MovieInfo from './components/MovieInfo';
import HomeScreen from './screens/HomeScreen';
import TvShowsScreen from './screens/TvShowsScreen';
import MoviesScreen from './screens/MoviesScreen';
import NewScreen from './screens/NewScreen';
import MyListScreen from './screens/MyListScreen';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import { useDispatch } from 'react-redux';
import { getUserDetails, logout } from './actions/userActions';
import { useEffect } from 'react';
import db, { auth } from './utils/firebase';
import { useState } from 'react';
import { USER_LOGIN_SUCCESS } from './constants/userConstants';
import { useSelector } from 'react-redux';
import LoadingScreen from './components/LoadingScreen';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
				console.log('user', user);

				dispatch({
					type: USER_LOGIN_SUCCESS,
					payload: user,
				});

				dispatch(getUserDetails());
			} else {
				setLoading(false);
				dispatch(logout());
			}
		});

		return persistLogin;
	}, [dispatch]);
	return (
		<div className="App">
			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
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
