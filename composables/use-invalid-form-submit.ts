import { objectValues, type NonNullObject } from '@sapphire/utilities';

export const useInvalidFormSubmit = (errors: NonNullObject) => {
	const snackbarStore = useSnackbars();

	snackbarStore.$reset();

	for (const error of objectValues(errors)) {
		if (error) {
			snackbarStore.addSnackbar({ message: error, severity: 'error' });
		}
	}
};
