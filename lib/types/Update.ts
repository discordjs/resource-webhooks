import type { Post } from '~~/lib/types/Post';

export interface Update extends Post {
	messageId: string;
}
