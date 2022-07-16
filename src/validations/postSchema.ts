import { WebhookRegex } from '@sapphire/discord-utilities';
import { boolean, object, string, type SchemaOf } from 'yup';
import type { Post } from '../models/PostModel';
import { autocompleteOptionSchema } from './autocompleteOptionSchema';

export const postSchema: SchemaOf<Post> = object({
	webhookUrl: string().required('You have to provide the URL of the webhook to post with.').matches(WebhookRegex, 'The webhook URL is invalid.'),
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

// https://discord.com/api/v10/webhooks/912084948872212541/lmCEA9-H506ugcXOypJbO168WE4hSqfHKx6NwONi69x0460splF9k_JhrL0XXlC7yTE0
