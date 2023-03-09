import { objectValues, type NonNullObject } from '@sapphire/utilities';

export const useInvalidFormSubmit = (errors: NonNullObject) => {
	const snackbars = useSnackbars();

	for (const error of objectValues(errors)) {
		if (error) {
			snackbars.show({
				type: 'danger',
				message: error,
				timeout: 6,
				pauseOnHover: true
			});
		}
	}
};
