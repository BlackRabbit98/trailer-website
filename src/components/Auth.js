import React, { useState } from 'react';
import '../styles/Auth.css';
import { useDispatch } from 'react-redux';
import { login, register as registerAction } from '../actions/userActions';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { auth } from '../utils/firebase';

function SignUpScreen({ loginHandler, isSignup = false, getStartedEmail }) {
	const [signUp, setSignUp] = useState(isSignup);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailValidation, setEmailValidation] = useState('');
	const [passwordValidation, setPasswordValidation] = useState('');
	const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
	const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

	const userLogin = useSelector((state) => state.userLogin);
	const { error } = userLogin;

	const userRegister = useSelector((state) => state.userRegister);
	const { error: errorSignup } = userRegister;

	const submitHandler = (e) => {
		e.preventDefault();
		let regEmail = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
		if (regEmail.test(email)) {
			setEmailValidation(null);
			/* return true */
		} else {
			setEmailValidation('Please enter correct email address');
		}

		let regPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
		if (regPassword.test(password)) {
			setPasswordValidation(null);
		} else {
			setPasswordValidation(
				'Please enter minimum eight characters, at least one letter and one number'
			);
		}

		if (
			emailValidation === null &&
			passwordValidation === null &&
			email !== ''
		) {
			//console.log('Calling API');
			signUp ? register(e) : signIn(e);
		}
	};

	const emailChangeHandler = (e) => {
		let emailVal = e.target.value;
		setEmail(emailVal);
		let regEmail = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
		if (regEmail.test(email)) {
			setEmailValidation(null);
			/* return true */
		}
	};

	const passwordChangeHandler = (e) => {
		let passVal = e.target.value;
		setPassword(passVal);
		let regPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
		if (regPassword.test(password)) {
			setPasswordValidation(null);
			/* return true */
		}
	};

	const dispatch = useDispatch();
	// const userLogin = useSelector((state) => state.userLogin);
	// const { loading, error, userInfo } = userLogin;

	useEffect(() => {
		if (getStartedEmail) setEmail(getStartedEmail);
	}, [getStartedEmail]);

	const register = (e) => {
		e.preventDefault();

		dispatch(registerAction(email, password));
	};

	const signIn = (e) => {
		e.preventDefault();

		dispatch(login(email, password));
	};

	const switchSignUp = () => {
		setSignUp(!signUp);
	};

	const forgotPasswordEmailHandler = (e) => {
		e.preventDefault();
		if (forgotPasswordEmail !== '') {
			auth.sendPasswordResetEmail(forgotPasswordEmail)
				.then(() => {
					// Password reset email sent!
					// ..
					//console.log('email sent');
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					//console.log(errorCode, errorMessage);
					// ..
				});
		}
	};

	return (
		<div className="signUpScreen__Container">
			{forgotPasswordOpen && (
				<div
					className="forgotPasswordContainer"
					onClick={(e) => {
						if (e.target === e.currentTarget) {
							setForgotPasswordOpen(!forgotPasswordOpen);
							setForgotPasswordEmail('');
						}
					}}>
					<div className="forgotPasswordOpen">
						<i
							className="fas fa-times"
							onClick={(e) => {
								if (e.target === e.currentTarget) {
									setForgotPasswordOpen(!forgotPasswordOpen);
									setForgotPasswordEmail('');
								}
							}}></i>
						<form>
							<input
								type="email"
								onChange={(e) => {
									setForgotPasswordEmail(e.target.value);
								}}
								value={forgotPasswordEmail}
								placeholder="Email"
							/>
							<button onClick={forgotPasswordEmailHandler}>
								Send reset email
							</button>
						</form>
					</div>
				</div>
			)}
			<div className="signUpScreen">
				<div className="cancelButton_container">
					<div
						className="cancelButton"
						onClick={() => loginHandler()}>
						<i className="fas fa-times"></i>
					</div>
				</div>
				<form>
					<h1>{signUp ? 'Sign Up' : 'Sign In'}</h1>
					{signUp && <input type="text" placeholder="Name" />}
					<input
						type="email"
						onChange={emailChangeHandler}
						value={email}
						placeholder="Email"
					/>
					{emailValidation && (
						<p className="SignInVal">⚠️ {emailValidation}</p>
					)}
					<input
						type="password"
						value={password}
						onChange={passwordChangeHandler}
						placeholder="Password"
					/>
					{passwordValidation && (
						<p className="SignInVal">⚠️ {passwordValidation}</p>
					)}
					{signUp && (
						<input type="password" placeholder="Confirm Password" />
					)}
					<button type="submit" onClick={submitHandler}>
						{signUp ? 'CREATE ACCOUNT' : 'LOGIN'}
					</button>
					{signUp && (
						<p className="form-p">
							By creating an account you agree to the terms of use
						</p>
					)}
					{!signUp && (
						<p
							className="form-p"
							onClick={() => {
								setForgotPasswordOpen(!forgotPasswordOpen);
							}}>
							Forgot Password?
						</p>
					)}
					<h4>
						<span className="signUpScreen__gray">
							{' '}
							{signUp ? 'Already joined?' : 'New to Trailerzz?'}
						</span>
						<span
							className="signUpScreen__link"
							onClick={() => switchSignUp()}>
							{' '}
							{signUp ? 'Sign In' : 'Sign Up'}
						</span>
					</h4>
					{error && !signUp && <p className="SignInVal">⚠️{error}</p>}
					{errorSignup && signUp && (
						<p className="SignInVal">⚠️{errorSignup}</p>
					)}
				</form>
			</div>
		</div>
	);
}

export default SignUpScreen;
