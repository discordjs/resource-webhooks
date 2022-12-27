import type { LocalStorageEntry } from '../utils/localStorage';

export interface Post {
	webhookUrl: string | LocalStorageEntry;

	text: string;
	mentionRole: boolean;
	role: LocalStorageEntry | null;
}
