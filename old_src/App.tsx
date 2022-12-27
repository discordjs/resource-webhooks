import { createTheme, CssBaseline, Grow, ThemeProvider, useMediaQuery } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { lazy, Suspense, useMemo, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppErrorBoundary from './components/AppErrorBoundary';
import Layout from './components/Layout';
import Loading from './components/Loading';
import SnackbarDismissButton from './components/Snackbars/SnackbarDismissButton';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { DarkModeContextProvider } from './utils/darkModeContext';

const Post = lazy(() => import('./pages/Post'));
const Update = lazy(() => import('./pages/Update'));
const WebhookConfig = lazy(() => import('./pages/WebhookConfig'));

function App() {
	const [isLoading, setIsLoading] = useState(false);

	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode: prefersDarkMode ? 'dark' : 'light',
					primary: {
						main: '#254fb9'
					},
					secondary: {
						main: '#1EA7C7'
					}
				},
				components: {
					MuiButton: {
						defaultProps: {
							variant: 'contained',
							color: 'primary'
						}
					},
					MuiFormHelperText: {
						styleOverrides: {
							root: {
								margin: 0
							}
						}
					}
				}
			}),
		[prefersDarkMode]
	);

	return (
		<>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Loading isLoading={isLoading} />
				<DarkModeContextProvider value={prefersDarkMode}>
					<BrowserRouter>
						<SnackbarProvider
							maxSnack={5}
							TransitionComponent={Grow}
							action={(snackbarKey) => <SnackbarDismissButton snackbarKey={snackbarKey} />}
						>
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
									<Route path="config">
										<Route path="roles" element={<div>roles</div>}></Route>
										<Route
											path="*"
											element={
												<AppErrorBoundary>
													<Suspense fallback={<Loading isLoading={true} />}>
														<WebhookConfig setIsLoading={setIsLoading} />
													</Suspense>
												</AppErrorBoundary>
											}
										/>
									</Route>
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
						</SnackbarProvider>
					</BrowserRouter>
				</DarkModeContextProvider>
			</ThemeProvider>
		</>
	);
}

export default App;
