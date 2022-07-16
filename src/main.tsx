import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<App />
	</StrictMode>
);

declare module 'react' {
	interface HTMLAttributes<T> {
		'data-option-index'?: number;
	}
}
