export default function <T extends object>(errors: T) {
	const { $toast } = useNuxtApp();

	for (const error of Object.values(errors)) {
		if (error) {
			$toast.show({
				type: 'danger',
				message: error,
				timeout: 10,
				pauseOnHover: true
			});
		}
	}
}
