import { Container, Paper } from '@mui/material';
import { Outlet } from 'react-router-dom';
import AppHeader from './AppHeader';

const Layout = () => {
	return (
		<>
			<AppHeader />
			<Container
				maxWidth="lg"
				sx={{
					pb: 8,
					height: 'calc(100vh - 64px - 68.500px)',
					display: 'flex',
					justifyContent: 'center'
				}}
			>
				<Outlet />
			</Container>
			<Paper square sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, maxHeight: 64, minHeight: 64 }} elevation={3}>
				Footer
			</Paper>
		</>
	);
};

export default Layout;
