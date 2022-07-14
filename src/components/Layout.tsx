import { Outlet } from 'react-router-dom';
import AppHeader from './AppHeader';

const Layout = () => {
	return (
		<>
			<AppHeader />
			<Outlet />
			<div>Footer</div>
		</>
	);
};

export default Layout;
