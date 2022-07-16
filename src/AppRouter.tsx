import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppErrorBoundary from './components/AppErrorBoundary';
import Layout from './components/Layout';
import Loading from './components/Loading';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Post from './pages/Post';
import UpdatePage from './pages/Update';

function AppRouter() {
	const [isLoading, setIsLoading] = useState(false);

	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	window.enqueueSnackbar = enqueueSnackbar;
	window.closeSnackbar = closeSnackbar;

	return (
		<>
			<Loading isLoading={isLoading} />
			<BrowserRouter>
				<Routes>
					<Route path="*" element={<Layout />}>
						<Route path="" element={<Home />} />
						<Route path="home" element={<Home />} />
						<Route
							path="post"
							element={
								<AppErrorBoundary>
									<Post setIsLoading={setIsLoading} />
								</AppErrorBoundary>
							}
						/>
						<Route
							path="update"
							element={
								<AppErrorBoundary>
									<UpdatePage setIsLoading={setIsLoading} />
								</AppErrorBoundary>
							}
						/>
						<Route path="*" element={<NotFound />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default AppRouter;
