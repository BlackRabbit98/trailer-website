import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { Slide, toast, ToastContainer } from 'react-toastify';

const ServiceWorkerController = () => {
	useEffect(() => {
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
				toast.success("🙏 Please wait, we're updating your app!", {
					position: 'top-center',
					transition: Slide,
					autoClose: 2500,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: true,
				});

				setTimeout(() => window.location.reload(), 2500);
			},
		});
	}, []);

	return <App />;
};

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ServiceWorkerController />
		</Provider>
		<ToastContainer />
	</React.StrictMode>,
	document.getElementById('root')
);

serviceWorkerRegistration.register();
