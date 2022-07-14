import { Container } from '@mui/material';
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
					height: 'calc(100vh - 64px - 68.500px)'
				}}
			>
				<Outlet />
			</Container>
			<Container
				maxWidth={false}
				sx={{
					position: 'absolute',
					left: 0,
					bottom: 0,
					right: 0,
					maxHeight: 64,
					minHeight: 64,
					backgroundColor: '#242526'
				}}
			>
				Footer
			</Container>
		</>
	);
};

export default Layout;
