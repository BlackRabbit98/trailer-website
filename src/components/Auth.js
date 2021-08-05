import React, { useState } from 'react';
import '../styles/Auth.css';
import { useDispatch } from 'react-redux';
import { login, register as registerAction } from '../actions/userActions';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { auth } from '../utils/firebase';
import LoadingScreen from './LoadingScreen';
import { toast } from 'react-toastify';

function SignUpScreen({ loginHandler, isSignup = false, getStartedEmail }) {
	const [signUp, setSignUp] = useState(isSignup);
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [emailValidation, setEmailValidation] = useState('');
	const [passwordValidation, setPasswordValidation] = useState('');
	const [confirmPasswordValidation, setConfirmPasswordValidation] =
		useState('');

	const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
	const [forgotPasswordEmailValidation, setForgotPasswordEmailValidation] =
		useState('');

	const userLogin = useSelector((state) => state.userLogin);
	const { error } = userLogin;

	const userRegister = useSelector((state) => state.userRegister);
	const { error: errorSignup } = userRegister;

	const [inputType, setInputType] = useState('password');
	const [inputType2, setInputType2] = useState('password');

	const submitHandler = (e) => {
		e.preventDefault();
		let regEmail = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
		if (!regEmail.test(email)) {
			setEmailValidation('Please enter correct email address');
			return;
		}
		let regPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
		if (!regPassword.test(password)) {
			setPasswordValidation(
				'Please enter minimum nine characters, at least one letter and one number'
			);
			return;
		}
		if (password !== confirmPassword) {
			setConfirmPasswordValidation(
				'Your confirm password does not match to password'
			);
			return;
		}
		if (
			emailValidation === null &&
			passwordValidation === null &&
			email !== ''
		) {
			//console.log('Calling API');
			signUp ? register(e) : signIn(e);
		} else {
			setEmailValidation('Please enter correct email address');
			setPasswordValidation(
				'Please enter minimum nine characters, at least one letter and one number'
			);
		}
	};

	const emailChangeHandler = (e) => {
		let emailVal = e.target.value;
		setEmail(emailVal);
		let regEmail = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
		if (regEmail.test(emailVal)) {
			setEmailValidation(null);
			/* return true */
		}
	};

	const passwordChangeHandler = (e) => {
		let passVal = e.target.value;
		setPassword(passVal);
		let regPassword = /^(?=.*[a-z])(?=.*\d).{8,}$/;
		if (regPassword.test(passVal)) {
			setPasswordValidation(null);
			/* return true */
		}
	};

	const confirmPasswordChangeHandler = (e) => {
		let passVal = e.target.value;
		setConfirmPassword(passVal);
		if (passVal === password) {
			setConfirmPasswordValidation(null);
			/* return true */
		}
	};

	const forgotPasswordEmailValidationHandler = (e) => {
		let forgotPasswordEmailVal = e.target.value;
		setForgotPasswordEmail(forgotPasswordEmailVal);
		let regEmail = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
		if (regEmail.test(forgotPasswordEmailVal)) {
			setForgotPasswordEmailValidation(null);
			/* return true */
		}
	};

	const dispatch = useDispatch();
	// const userLogin = useSelector((state) => state.userLogin);
	// const { loading, error, userInfo } = userLogin;

	useEffect(() => {
		if (getStartedEmail) setEmail(getStartedEmail);
	}, [getStartedEmail]);

	const register = async (e) => {
		e.preventDefault();
		setLoading(true);
		await dispatch(registerAction(email, password, username));
		setLoading(false);
	};

	const signIn = async (e) => {
		e.preventDefault();
		setLoading(true);
		await dispatch(login(email, password));
		setLoading(false);
	};

	const switchSignUp = () => {
		setSignUp(!signUp);
	};

	const forgotPasswordEmailHandler = (e) => {
		e.preventDefault();
		let regEmail = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
		if (!regEmail.test(e.target.value)) {
			setForgotPasswordEmailValidation(
				'Please enter correct email address'
			);
			return;
		}

		if (forgotPasswordEmail !== '') {
			setLoading(true);
			auth.sendPasswordResetEmail(forgotPasswordEmail)
				.then(() => {
					// Password reset email sent!
					// ..
					//console.log('email sent');

					setLoading(false);
					setForgotPasswordOpen(!forgotPasswordOpen);
					setForgotPasswordEmail('');
					toast.success(
						'📨 Please check your email for Password reset link!!',
						{
							position: 'top-center',
							autoClose: 2500,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
						}
					);
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;

					setLoading(false);
					//console.log(errorCode, errorMessage);
					// ..
				});
		}
	};

	return (
		<div className="signUpScreen__Container">
			{loading && <LoadingScreen />}
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
								onChange={forgotPasswordEmailValidationHandler}
								value={forgotPasswordEmail}
								placeholder="Email"
							/>
							{forgotPasswordEmailValidation && (
								<p className="SignInVal">
									⚠️ {forgotPasswordEmailValidation}
								</p>
							)}
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
					{signUp && (
						<input
							type="text"
							placeholder="Name"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					)}
					<input
						type="email"
						onChange={emailChangeHandler}
						value={email}
						placeholder="Email"
					/>
					{emailValidation && (
						<p className="SignInVal">⚠️ {emailValidation}</p>
					)}
					<div className="signupScreen_password">
						<input
							type={inputType}
							value={password}
							onChange={passwordChangeHandler}
							placeholder="Password"
						/>
						{inputType === 'password' ? (
							<i
								className="fas fa-eye"
								onClick={() => setInputType('text')}></i>
						) : (
							<i
								className="fas fa-eye-slash"
								onClick={() => setInputType('password')}></i>
						)}
					</div>

					{passwordValidation && (
						<p className="SignInVal">⚠️ {passwordValidation}</p>
					)}
					{signUp && (
						<div className="signupScreen_password">
							<input
								type={inputType2}
								value={confirmPassword}
								onChange={confirmPasswordChangeHandler}
								placeholder="Confirm Password"
							/>
							{inputType2 === 'password' ? (
								<i
									className="fas fa-eye"
									onClick={() => setInputType2('text')}></i>
							) : (
								<i
									className="fas fa-eye-slash"
									onClick={() =>
										setInputType2('password')
									}></i>
							)}
						</div>
					)}

					{confirmPasswordValidation && (
						<p className="SignInVal">
							⚠️ {confirmPasswordValidation}
						</p>
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
