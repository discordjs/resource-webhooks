import { object, string } from 'yup';
import { persistedStorageEntrySchema } from '~~/lib/schemas/persistedStorageEntrySchema';

export const postSchema = object({
	webhookUrl: persistedStorageEntrySchema.required('You have to choose the URL of the webhook to post with.'),
	text: string().required('The text to post with the webhook is required.'),
	role: persistedStorageEntrySchema.nullable()
});
