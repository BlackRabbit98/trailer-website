import React from 'react';
import '../styles/Header.css';
import { IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { NavLink, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../actions/userActions';

export default function Header() {
	const [showAvatarMenu, setShowAvatarMenu] = useState(false);
	const [showHamMenu, setShowHamMenu] = useState(false);
	const [expandSearchMenu, setExpandSearchMenu] = useState(false);

	const [searchQuery, setSearchQuery] = useState('');

	const dispatch = useDispatch();
	const history = useHistory();

	const searchButtonHandler = (e) => {
		e.preventDefault();
		if (searchQuery) {
			history.push(`/search/${searchQuery}`);
			setSearchQuery('');
			setExpandSearchMenu(false);
		} else {
			setExpandSearchMenu(true);
		}
	};

	const hamMenu = (
		<div
			className="header_hamMenu_container"
			onClick={() => setShowHamMenu(false)}>
			<div className="header_hamMenu">
				<div exact className="home_link">
					<i className="fas fa-times-circle"></i>
				</div>
				<NavLink
					to="/"
					exact
					className="home_link"
					activeClassName="active_link">
					<p>Home</p>
				</NavLink>
				<NavLink
					to="/tvshows"
					exact
					className="home_link"
					activeClassName="active_link">
					<p>TV Shows</p>
				</NavLink>
				<NavLink
					to="/movies"
					exact
					className="home_link"
					activeClassName="active_link">
					<p>Movies</p>
				</NavLink>
				<NavLink
					to="/new"
					exact
					className="home_link"
					activeClassName="active_link">
					<p>New</p>
				</NavLink>
				<NavLink
					to="/mylist"
					exact
					className="home_link"
					activeClassName="active_link">
					<p>My List</p>
				</NavLink>
			</div>
		</div>
	);

	return (
		<div className="header">
			{showHamMenu && hamMenu}
			<div className="header_ham" onClick={() => setShowHamMenu(true)}>
				<i className="fas fa-bars"></i>
			</div>
			<div className="header_left">
				<h2>Trailerzz</h2>
			</div>
			<div className="header_center">
				<NavLink
					to="/"
					exact
					className="home_link"
					activeClassName="active_link">
					<p>Home</p>
				</NavLink>
				<NavLink
					to="/tvshows"
					exact
					className="home_link"
					activeClassName="active_link">
					<p>TV Shows</p>
				</NavLink>
				<NavLink
					to="/movies"
					exact
					className="home_link"
					activeClassName="active_link">
					<p>Movies</p>
				</NavLink>
				<NavLink
					to="/new"
					exact
					className="home_link"
					activeClassName="active_link">
					<p>New</p>
				</NavLink>
				<NavLink
					to="/mylist"
					exact
					className="home_link"
					activeClassName="active_link">
					<p>My List</p>
				</NavLink>
			</div>
			<div className="header_right">
				<div className="header_right_search">
					{expandSearchMenu && (
						<div
							className="header_right_modal"
							onClick={(e) => {
								e.preventDefault();
								setSearchQuery('');
								setExpandSearchMenu(false);
							}}
						/>
					)}
					<input
						type="text"
						className={
							expandSearchMenu
								? 'header_right_input header_right_input_expand'
								: 'header_right_input'
						}
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								searchButtonHandler(e);
							}
						}}
					/>
					<IconButton
						className="search_icon"
						onClick={searchButtonHandler}>
						<SearchIcon />
					</IconButton>
				</div>

				<div className="avatarmenu_parent">
					{showAvatarMenu && (
						<>
							<div
								className="avatarContentsModal"
								onClick={() =>
									setShowAvatarMenu(!showAvatarMenu)
								}
							/>
							<div
								className="avatarContents"
								onClick={() =>
									setShowAvatarMenu(!showAvatarMenu)
								}>
								<div
									className="avatarContents_myAccountButton"
									onClick={() => history.push('/myaccount')}>
									<i class="fas fa-cog"></i>My account
								</div>
								<div
									className="avatarContents_logoutButton"
									onClick={() => dispatch(logout())}>
									<i class="fas fa-sign-out-alt"></i>Logout
								</div>
							</div>
						</>
					)}
					<IconButton
						onClick={() => setShowAvatarMenu(!showAvatarMenu)}>
						<AccountCircleIcon className="avatar" />
					</IconButton>
				</div>
			</div>
		</div>
	);
}
