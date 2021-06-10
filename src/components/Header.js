import React from 'react';
import '../styles/Header.css';
import { IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { NavLink } from 'react-router-dom';

export default function Header() {
	return (
		<div className="header">
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
				<IconButton>
					<SearchIcon className="search_icon" />
				</IconButton>

				<IconButton>
					<AccountCircleIcon className="avatar" />
				</IconButton>
			</div>
		</div>
	);
}
