import type { AutocompleteOption } from '../components/Form/FormAutoComplete';

export interface Post {
	webhookUrl: string;

	text: string;
	mentionRole: boolean;
	role: AutocompleteOption | null;
}
