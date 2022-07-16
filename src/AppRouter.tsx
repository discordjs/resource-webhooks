import { useSnackbar } from 'notistack';
import { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppErrorBoundary from './components/AppErrorBoundary';
import Layout from './components/Layout';
import Loading from './components/Loading';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const Post = lazy(() => import('./pages/Post'));
const Update = lazy(() => import('./pages/Update'));

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
									<Suspense fallback={<Loading isLoading={true} />}>
										<Post setIsLoading={setIsLoading} />
									</Suspense>
								</AppErrorBoundary>
							}
						/>
						<Route
							path="update"
							element={
								<AppErrorBoundary>
									<Suspense fallback={<Loading isLoading={true} />}>
										<Update setIsLoading={setIsLoading} />
									</Suspense>
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
