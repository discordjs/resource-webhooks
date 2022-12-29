import type { MaybeComputedRef } from '@vueuse/shared';
import type { LocalStorageEntry } from '~~/lib/utils/localStorage';

export const useWebhooks = () => useLocalStorage(LocalStorageKeys.WebhookUrls, [] as MaybeComputedRef<LocalStorageEntry[]>);
export const useRoles = () => useLocalStorage(LocalStorageKeys.Roles, [] as MaybeComputedRef<LocalStorageEntry[]>);
export const useOpenModal = () => useState<string | null>('open-modal', () => null);
