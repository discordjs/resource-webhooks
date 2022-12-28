import type { LocalStorageEntry } from '~~/lib/utils/localStorage';

export interface Post {
	webhookUrl: string | LocalStorageEntry;
	text: string;
	role: LocalStorageEntry | '';
}
