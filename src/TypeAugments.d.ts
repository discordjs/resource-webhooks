import type { Theme } from '@mui/material';

declare module 'react' {
	interface HTMLAttributes<T> {
		'data-option-index'?: number;
	}
}

declare module '@mui/styles/defaultTheme' {
	interface DefaultTheme extends Theme {}
}
