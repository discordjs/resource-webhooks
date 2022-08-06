import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { useState, type MouseEvent } from 'react';
import DesktopNavMenu from './Nav/DesktopNavMenu';
import MobileNavMenu from './Nav/MobileNavMenu';

const pages: [label: string, path: string][] = [
	['Home', 'home'],
	['Post', 'post'],
	['Update', 'update'],
	['Configure Webhooks', 'config/webhooks'],
	['Configure Roles', 'config/roles']
];

const AppHeader = () => {
	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

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
					<MobileNavMenu
						anchorElNav={anchorElNav}
						pages={pages}
						handleCloseNavMenu={handleCloseNavMenu}
						handleOpenNavMenu={handleOpenNavMenu}
					/>

					<DesktopNavMenu pages={pages} handleCloseNavMenu={handleCloseNavMenu} />
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default AppHeader;
