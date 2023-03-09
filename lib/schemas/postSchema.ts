import { object, string } from 'yup';
import { localStorageEntrySchema } from '~~/lib/schemas/localStorageEntrySchema';

export const postSchema = object({
	webhookUrl: localStorageEntrySchema.required('You have to choose the URL of the webhook to post with.').nullable(),
	text: string().required('The text to post with the webhook is required.'),
	role: localStorageEntrySchema.required('You have to specify a role to mention.').nullable()
});
