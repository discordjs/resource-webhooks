import { WebhookRegex } from '@sapphire/discord-utilities';
import { isObject } from '@sapphire/utilities';
import { boolean, object, string, type SchemaOf } from 'yup';
import type { AutocompleteOption } from '../components/Form/FormAutoComplete';
import type { Post } from '../models/PostModel';
import { autocompleteOptionSchema } from './autocompleteOptionSchema';

export function transformAutocompleteOptionToStringValue(value: string | AutocompleteOption): string {
	if (isObject(value)) {
		return value.value;
	}

	return value;
}

export const postSchema: SchemaOf<Post> = object({
	webhookUrl: string()
		.required('You have to provide the URL of the webhook to post with.')
		.matches(WebhookRegex, 'The webhook URL is invalid.')
		.transform(transformAutocompleteOptionToStringValue),
	text: string().required('The text to post with the webhook is required.'),
	mentionRole: boolean().required('You have to specify whether you want to mention a role or not.'),
	role: autocompleteOptionSchema
		.when('mentionRole', {
			is: true,
			then: (schema) => schema.required('You have to specify a role to mention.'),
			otherwise: (schema) => schema.optional()
		})
		.nullable()
});
