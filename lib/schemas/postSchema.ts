import { isObject } from '@sapphire/utilities';
import { boolean, object, string, type SchemaOf } from 'yup';
import { localStorageEntrySchema } from '~~/lib/schemas/localStorageEntrySchema';
import type { Post } from '~~/lib/types/Post';
import type { LocalStorageEntry } from '~~/lib/utils/localStorage';
import { WebhookRegex } from '~~/lib/utils/WebhookRegex';

function transformAutocompleteOptionToStringValue(value: string | LocalStorageEntry): string {
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
	role: localStorageEntrySchema
		.when('mentionRole', {
			is: true,
			then: (schema) => schema.required('You have to specify a role to mention.'),
			otherwise: (schema) => schema.optional()
		})
		.nullable()
});
