import { acceptHMRUpdate, defineStore } from 'pinia';

export interface Snackbar {
	id?: string;
	message: string;
	severity: 'error' | 'info' | 'success' | 'warning';
}

interface SnackbarState {
	snackbars: Snackbar[];
}

function generateRandomSnackbarId() {
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export const useSnackbars = defineStore('snackbars', {
	state: (): SnackbarState => ({
		snackbars: [] as Snackbar[]
	}),

	actions: {
		addSnackbar(snackbar: Snackbar, autoHideDuration = 2000) {
			if (!snackbar.id) {
				snackbar.id = generateRandomSnackbarId();
			}

			this.snackbars.push(snackbar);

			setTimeout(() => {
				this.removeSnackbar(snackbar.id!);
			}, autoHideDuration);
		},

		removeSnackbar(id: string) {
			this.snackbars = this.snackbars.filter((snackbar) => id !== snackbar.id);
		}
	}
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useSnackbars, import.meta.hot));
}
