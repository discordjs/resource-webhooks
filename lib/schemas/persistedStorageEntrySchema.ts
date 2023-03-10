import { object, string } from 'yup';

export const persistedStorageEntrySchema = object({
	label: string().required('Label for the autocomplete option is required'),
	value: string().required('Value for the autocomplete option is required')
});
