import firebase from 'firebase';

const firebaseConfig = {
	apiKey: 'AIzaSyB7feaaszeeEjwpKfVPfVZJrAwjJw3he5o',
	authDomain: 'trailerzz.firebaseapp.com',
	projectId: 'trailerzz',
	storageBucket: 'trailerzz.appspot.com',
	messagingSenderId: '996947810014',
	appId: '1:996947810014:web:df85efdd616ae25e07544f',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;
