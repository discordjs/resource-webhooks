import { object, string, type SchemaOf } from 'yup';
import type { Update } from '../models/updateModel';
import { postSchema } from './postSchema';

export const updateSchema: SchemaOf<Update> = postSchema.concat(
	object({
		messageId: string().required('You have to provide the message ID of the message to update.')
	})
);
