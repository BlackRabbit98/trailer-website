import React from 'react';
import '../styles/Header.css';
import { IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export default function Header() {
	return (
		<div className="header">
			<div className="header_left">
				<h2>WatchTrailer</h2>
			</div>
			<div className="header_center">
				<p>Home</p>
				<p>TV Shows</p>
				<p>Movies</p>
				<p>New</p>
				<p>My List</p>
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
