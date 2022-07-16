import { object, string, type SchemaOf } from 'yup';
import type { AutocompleteOption } from '../components/Form/FormAutoComplete';

export const autocompleteOptionSchema: SchemaOf<AutocompleteOption> = object({
	label: string().required('Label for the autocomplete option is required'),
	value: string().required('Value for the autocomplete option is required')
});
