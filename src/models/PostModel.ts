import type { LocalStorageEntry } from '../utils/localStorage';

export interface Post {
	webhookUrl: string;

	text: string;
	mentionRole: boolean;
	role: LocalStorageEntry | null;
}
