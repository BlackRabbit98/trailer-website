import React, { useRef, useState } from 'react';
import { auth } from '../utils/firebase';
import '../styles/Auth.css';

function SignUpScreen({ loginHandler }) {
	const emailRef = useRef(null);
	const passwordRef = useRef(null);

	const [signUp, setSignUp] = useState(false);

	const register = (e) => {
		e.preventDefault();
		setSignUp(true);

		auth.createUserWithEmailAndPassword(
			emailRef.current.value,
			passwordRef.current.value
		)
			.then((authUser) => {
				console.log('Signed up User Details: ', authUser);
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	const signIn = (e) => {
		e.preventDefault();

		auth.signInWithEmailAndPassword(
			emailRef.current.value,
			passwordRef.current.value
		)
			.then((authUser) => {
				console.log('Logged in User Details: ', authUser);
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	const switchSignUp = () => {
		setSignUp(!signUp);
	};

	return (
		<div className="signUpScreen__Container">
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
							ref={passwordRef}
							type="text"
							placeholder="Name"
						/>
					)}
					<input ref={emailRef} type="email" placeholder="Email" />
					<input
						ref={passwordRef}
						type="password"
						placeholder="Password"
					/>
					{signUp && (
						<input
							ref={passwordRef}
							type="password"
							placeholder="Confirm Password"
						/>
					)}
					<button
						type="submit"
						onClick={
							signUp ? (e) => register(e) : (e) => signIn(e)
						}>
						{signUp ? 'CREATE ACCOUNT' : 'LOGIN'}
					</button>
					{signUp && (
						<p>
							By creating an account you agree to the terms of use
						</p>
					)}
					{!signUp && <p>Forgot Password?</p>}
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
				</form>
			</div>
		</div>
	);
}

export default SignUpScreen;
