import { object, string } from 'yup';
import { postSchema } from '~~/lib/schemas/postSchema';

export const updateSchema = postSchema.concat(
	object({
		messageId: string().required('You have to provide the message ID of the message to update.')
	})
);
