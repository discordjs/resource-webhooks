import { object, string, type SchemaOf } from 'yup';
import { localStorageEntrySchema } from '~~/lib/schemas/localStorageEntrySchema';
import type { Post } from '~~/lib/types/Post';

export const postSchema: SchemaOf<Post> = object({
	webhookUrl: localStorageEntrySchema.required('You have to choose the URL of the webhook to post with.').nullable(),
	text: string().required('The text to post with the webhook is required.'),
	role: localStorageEntrySchema.required('You have to specify a role to mention.').nullable()
});
