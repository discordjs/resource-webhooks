import { object, string, type SchemaOf } from 'yup';
import type { LocalStorageEntry } from '../utils/localStorage';

export const localStorageEntrySchema: SchemaOf<LocalStorageEntry> = object({
	label: string().required('Label for the autocomplete option is required'),
	value: string().required('Value for the autocomplete option is required')
});
