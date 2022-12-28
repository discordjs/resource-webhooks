import type { LocalStorageEntry } from '~~/lib/utils/localStorage';

export interface Post {
	webhookUrl: LocalStorageEntry | '';
	text: string;
	role: LocalStorageEntry | '';
}
