import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useRouteMatch } from '../utils/routing';
import AppHeader from './AppHeader';
import Footer from './Footer';

const Layout = () => {
	const isOnConfigPage = Boolean(useRouteMatch(['/config/roles', '/config/webhooks']));

	return (
		<>
			<AppHeader />
			<Container
				maxWidth="lg"
				sx={{
					pb: 8,
					mb: 3,
					display: 'flex',
					justifyContent: isOnConfigPage ? 'flex-start' : 'center',
					flexDirection: isOnConfigPage ? 'column' : 'row'
				}}
			>
				<Outlet />
			</Container>
			<Footer />
		</>
	);
};

export default Layout;
