import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import { useMemo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Post from './pages/Post';
import Update from './pages/Update';

function App() {
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
				}
			}),
		[prefersDarkMode]
	);

	return (
		<>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<BrowserRouter>
					<Routes>
						<Route path="*" element={<Layout />}>
							<Route path="" element={<Home />} />
							<Route path="home" element={<Home />} />
							<Route path="post" element={<Post />} />
							<Route path="update" element={<Update />} />
							<Route path="*" element={<NotFound />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</>
	);
}

export default App;
