import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import AppHeader from './AppHeader';
import Footer from './Footer';

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
			<Footer />
		</>
	);
};

export default Layout;
