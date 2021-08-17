import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { ToastContainer } from 'react-toastify';

ReactDOM.render(
	<Provider store={store}>
		<App />
		<ToastContainer />
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register({
	onUpdate: async (registration) => {
		//Network assets differ from registered service worker, updating assets.
		await registration.unregister();
		// Makes Workbox call skipWaiting()
		registration.waiting.postMessage({ type: 'SKIP_WAITING' });
		// Once the service worker is unregistered, we can reload the page to let
		// the browser download a fresh copy of our app (invalidating the cache)

		window.location.reload();
	},
});
