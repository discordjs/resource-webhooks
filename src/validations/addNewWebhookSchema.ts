import { WebhookRegex } from '@sapphire/discord-utilities';
import { object, string, type SchemaOf } from 'yup';
import type { Webhook } from '../models/AddNewWebhook';

export const addNewWebhookSchema: SchemaOf<Webhook> = object({
	url: string().required('The webhook URL is required.').matches(WebhookRegex, 'The webhook URL is invalid.'),
	label: string()
		.required('The webhook label is required.')
		.min(3, 'The webhook label should at least be 3 characters long.')
		.max(50, 'The webhook label can at most be 50 characters long.')
});
