import type { LocalStorageEntry } from '~~/lib/utils/localStorage';

export type Post = {
	webhookUrl: LocalStorageEntry | '';
	text: string;
	role: LocalStorageEntry | '';
};
