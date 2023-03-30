export default function <T extends object>(errors: T) {
	const snackbars = useSnackbars();

	for (const error of Object.values(errors)) {
		if (error) {
			snackbars.show({
				type: 'danger',
				message: error,
				...defaultSnackbarProps
			});
		}
	}
}
