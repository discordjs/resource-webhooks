import MenuIcon from '@mui/icons-material/Menu';
import { Hidden } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import type { FC, MouseEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { useDarkModeContext } from '../../utils/darkModeContext';
import RouterLink from '../RouterLink';

interface Props {
	anchorElNav: null | HTMLElement;
	pages: [label: string, path: string][];

	handleCloseNavMenu(): void;
	handleOpenNavMenu(event: MouseEvent<HTMLElement>): void;
}

const MobileNavMenu: FC<Props> = ({ anchorElNav, pages, handleOpenNavMenu, handleCloseNavMenu }) => {
	const location = useLocation();
	const isDarkMode = useDarkModeContext();

	return (
		<Hidden mdUp>
			<Box
				sx={{
					flexGrow: 1,
					display: {
						xs: 'flex',
						md: 'none'
					}
				}}
			>
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
				>
					{pages.map(([label, to]) => {
						const pageIsCurrentPath = location.pathname === `/${to}`;

						return (
							<MenuItem
								key={label}
								onClick={handleCloseNavMenu}
								sx={{
									bgcolor: pageIsCurrentPath ? 'rgba(255, 255, 255, 0.2)' : 'inherit'
								}}
							>
								<RouterLink
									to={to}
									LinkProps={{
										textAlign: 'center',
										underline: pageIsCurrentPath ? 'always' : 'hover',
										sx: {
											color: isDarkMode ? 'primary.contrastText' : 'text.primary'
										}
									}}
								>
									{label}
								</RouterLink>
							</MenuItem>
						);
					})}
				</Menu>
			</Box>
		</Hidden>
	);
};

export default MobileNavMenu;
