import type { Post } from '~~/lib/types/Post';

export type Update = Post & {
	messageId: string;
};
