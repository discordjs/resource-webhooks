import type { PersistedStorageEntry } from '~~/lib/types/PersistedStorageEntry';

export type Post = {
	webhookUrl: PersistedStorageEntry | '';
	text: string;
	role: PersistedStorageEntry | '';
};
