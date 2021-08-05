import React, { useState } from 'react';
import { useEffect } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import '../styles/PaymentScreen.css';
import db from '../utils/firebase';

const mapPaymentTypeToAmount = {
	value: 50,
	pro: 100,
};

const mapPaymentTypeToLimit = {
	value: 50,
	pro: 1000,
};

const PaymentScreen = () => {
	const [sdkReady, setSdkReady] = useState(false);

	const { type } = useParams();
	const history = useHistory();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDetails = useSelector((state) => state.userDetails);
	const { user } = userDetails;

	useEffect(() => {
		if (type === 'basic') {
			history.push('/');
		}
	}, [history, type]);

	const successPaymentHandler = async (paymentResult) => {
		//console.log(paymentResult);
		await db
			.collection('movies')
			.doc(userInfo.uid)
			.set({
				favMovies: [...user.favMovies],
				limit: mapPaymentTypeToLimit[type],
			});
		history.push('/myaccount');
	};
	return (
		<div className="payment_container">
			<div className="payment_main">
				{type === 'pro' ? (
					<div>
						<h2>Pro Plan</h2>
						<p className="middleText">Unlimited mylist items</p>
						<p>Unlimited Trailers</p>
						<p>Email notifications</p>
						<p className="buttomText">$100/year</p>
					</div>
				) : (
					<div>
						<h2>Value Plan</h2>
						<p className="middleText">50 mylist items</p>
						<p>Unlimited Trailers</p>
						<p>Email notifications</p>
						<p className="buttomText">$50/year</p>
					</div>
				)}
				<h2>Pay Below to upgrade</h2>
				<PayPalButton
					amount={mapPaymentTypeToAmount[type]}
					onSuccess={successPaymentHandler}
					onButtonReady={() => setSdkReady(true)}
					options={{
						clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID,
						currency: 'AUD',
					}}
				/>
				{!sdkReady && <p>Loadingg...</p>}
			</div>
		</div>
	);
};

export default PaymentScreen;