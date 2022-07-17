import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [react()],
	build: {
		rollupOptions: {
			output: {
				manualChunks: (id) => {
					if (id.includes('node_modules')) {
						if (id.includes('@mui')) {
							return 'vendor_mui';
						}

						return 'vendor'; // all other package goes here
					}
				}
			}
		}
	}
});
