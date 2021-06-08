import './App.css';
import HomeScreen from './screens/HomeScreen';
import TvShows from './screens/TvShows';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';

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
						<TvShows />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
