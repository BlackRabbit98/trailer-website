import React from 'react';
import '../styles/Header.css';
import { IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useHistory } from 'react-router';

export default function Header() {
	const history = useHistory();

	return (
		<div className="header">
			<div className="header_left">
				<h2>Trailerzz</h2>
			</div>
			<div className="header_center">
				<p onClick={() => history.push('/')}>Home</p>
				<p onClick={() => history.push('/tvshows')}>TV Shows</p>
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
