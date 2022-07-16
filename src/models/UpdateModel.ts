import type { Post } from './PostModel';

export interface Update extends Post {
	messageId: string;
}
