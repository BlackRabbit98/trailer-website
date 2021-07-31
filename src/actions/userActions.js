import axios from 'axios';
import {
	USER_DETAILS_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_UPDATE_PROFILE_FAIL,
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_PROFILE_SUCCESS,
	USER_DETAILS_RESET,
} from '../constants/userConstants';
import db, { auth } from '../utils/firebase';

const createUserDetails = async (userId) => {
	//console.log('Creating first time user details');
	try {
		const createDetails = await db.collection('movies').doc(userId).set({
			favMovies: [],
			limit: 10,
		});

		//console.log('Successfully created user details', createDetails);
	} catch (error) {
		console.error('Error writing document: ', error);
	}
};

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_LOGIN_REQUEST,
		});

		const { user } = await auth.signInWithEmailAndPassword(email, password);

		//console.log('user', user);

		// .then((authUser) => {
		// 	//console.log('Signed up User Details: ', authUser);
		// })
		// .catch((error) => {
		// 	alert(error.message);
		// });

		// const config = {
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// };

		// const { data } = await axios.post(
		// 	'/api/users/login',
		// 	{ email, password },
		// 	config
		// );

		createUserDetails(user.uid);

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: user,
		});

		localStorage.setItem('userInfo', JSON.stringify(user));
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload: 'User email or password is invalid',
		});
	}
};

export const logout = () => (dispatch) => {
	localStorage.removeItem('userInfo');
	auth.signOut();
	dispatch({ type: USER_LOGOUT });
	dispatch({ type: USER_DETAILS_RESET });
};

export const register = (email, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_REGISTER_REQUEST,
		});

		// const config = {
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// };

		// const { data } = await axios.post(
		// 	'/api/users',
		// 	{ name, email, password },
		// 	config
		// );

		const { user } = await auth.createUserWithEmailAndPassword(
			email,
			password
		);
		createUserDetails(user.uid);

		dispatch({
			type: USER_REGISTER_SUCCESS,
			payload: user,
		});

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: user,
		});

		localStorage.setItem('userInfo', JSON.stringify(user));
	} catch (error) {
		//console.log(error);

		if (error.code === 'auth/email-already-in-use') {
			dispatch({
				type: USER_REGISTER_FAIL,
				payload: 'Email already used',
			});
		}
	}
};

export const getUserDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_DETAILS_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		let data;

		const doc = await db.collection('movies').doc(userInfo.uid).get();

		if (doc.exists) {
			data = doc.data();
		} else {
			data = null;
		}

		dispatch({
			type: USER_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		if (message === 'Not authorized, token failed') {
			dispatch(logout());
		}
		dispatch({
			type: USER_DETAILS_FAIL,
			payload: message,
		});
	}
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_UPDATE_PROFILE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.put(`/api/users/profile`, user, config);

		dispatch({
			type: USER_DETAILS_SUCCESS,
			payload: data,
		});

		dispatch({
			type: USER_UPDATE_PROFILE_SUCCESS,
			payload: data,
		});
		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		});
		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		if (message === 'Not authorized, token failed') {
			dispatch(logout());
		}
		dispatch({
			type: USER_UPDATE_PROFILE_FAIL,
			payload: message,
		});
	}
};
