import type { PersistedStorageEntry } from '~~/lib/types/PersistedStorageEntry';

export type Post = {
	webhookUrl: PersistedStorageEntry | null;
	text: string;
	role: PersistedStorageEntry | null;
};
