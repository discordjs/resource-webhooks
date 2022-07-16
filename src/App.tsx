import { createTheme, CssBaseline, Grow, ThemeProvider, useMediaQuery } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { useMemo } from 'react';
import AppRouter from './AppRouter';
import SnackbarDismissButton from './components/SnackbarDismissButton';

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
				<SnackbarProvider
					maxSnack={5}
					TransitionComponent={Grow}
					action={(snackbarKey) => <SnackbarDismissButton snackbarKey={snackbarKey} />}
				>
					<AppRouter />
				</SnackbarProvider>
			</ThemeProvider>
		</>
	);
}

export default App;
