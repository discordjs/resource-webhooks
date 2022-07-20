import { WebhookRegex } from '@sapphire/discord-utilities';
import { object, string, type SchemaOf } from 'yup';
import type { LocalStorageEntry } from '../utils/localStorage';

export const addNewWebhookSchema: SchemaOf<LocalStorageEntry> = object({
	value: string().required('The webhook URL is required.').matches(WebhookRegex, 'The webhook URL is invalid.'),
	label: string()
		.required('The webhook label is required.')
		.min(3, 'The webhook label should at least be 3 characters long.')
		.max(50, 'The webhook label can at most be 50 characters long.')
});
