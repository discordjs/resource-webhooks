import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import { useState, type MouseEvent } from 'react';
import { useDarkModeContext } from '../utils/darkModeContext';
import RouterLink from './RouterLink';

const pages: [label: string, path: string][] = [
	['Home', 'home'],
	['Post', 'post'],
	['Update', 'update'],
	['Configure Webhooks', 'config/webhooks'],
	['Configure Roles', 'config/roles']
];

const AppHeader = () => {
	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
	const isDarkMode = useDarkModeContext();

	const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size="large"
							aria-label="menu"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left'
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left'
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' }
							}}
						>
							{pages.map(([label, to]) => (
								<MenuItem key={label} onClick={handleCloseNavMenu}>
									<RouterLink
										to={to}
										LinkProps={{
											textAlign: 'center',
											underline: 'none',
											sx: {
												color: isDarkMode ? 'primary.contrastText' : 'text.primary'
											}
										}}
									>
										{label}
									</RouterLink>
								</MenuItem>
							))}
						</Menu>
					</Box>

					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{pages.map(([label, to]) => (
							<Button variant="text" color="inherit" key={label} onClick={handleCloseNavMenu} sx={{ my: 2 }}>
								<RouterLink
									to={to}
									LinkProps={{
										textAlign: 'center',
										underline: 'hover',
										sx: {
											color: 'primary.contrastText'
										}
									}}
								>
									{label}
								</RouterLink>
							</Button>
						))}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default AppHeader;
