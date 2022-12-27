import { Button, Hidden } from '@mui/material';
import Box from '@mui/material/Box';
import type { FC } from 'react';
import { useLocation } from 'react-router-dom';
import RouterLink from '../RouterLink';

interface Props {
	pages: [label: string, path: string][];

	handleCloseNavMenu(): void;
}

const DesktopNavMenu: FC<Props> = ({ pages, handleCloseNavMenu }) => {
	const location = useLocation();

	return (
		<Hidden mdDown>
			<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
				{pages.map(([label, to]) => {
					const pageIsCurrentPath = location.pathname === `/${to}`;

					return (
						<Button
							variant="text"
							color="inherit"
							key={label}
							onClick={handleCloseNavMenu}
							sx={{
								my: 2,
								bgcolor: pageIsCurrentPath ? 'rgba(255, 255, 255, 0.2)' : 'inherit'
							}}
						>
							<RouterLink
								to={to}
								LinkProps={{
									textAlign: 'center',
									underline: pageIsCurrentPath ? 'always' : 'hover',
									sx: {
										color: 'primary.contrastText'
									}
								}}
							>
								{label}
							</RouterLink>
						</Button>
					);
				})}
			</Box>
		</Hidden>
	);
};

export default DesktopNavMenu;
