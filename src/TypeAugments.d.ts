import type { Theme } from '@mui/material';
import type { OptionsObject, SnackbarKey, SnackbarMessage } from 'notistack';

declare module 'react' {
	interface HTMLAttributes<T> {
		'data-option-index'?: number;
	}
}

declare module '@mui/styles/defaultTheme' {
	interface DefaultTheme extends Theme {}
}

declare global {
	function enqueueSnackbar(message: SnackbarMessage, options?: OptionsObject | undefined): SnackbarKey;
	function closeSnackbar(key?: SnackbarKey): void;
}
