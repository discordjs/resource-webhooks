import type { MaybeComputedRef } from '@vueuse/shared';
import type { LocalStorageEntry } from '~~/lib/utils/localStorage';
import { useToast } from 'tailvue';

export const useWebhooks = () => useLocalStorage(LocalStorageKeys.WebhookUrls, [] as MaybeComputedRef<LocalStorageEntry[]>);
export const useRoles = () => useLocalStorage(LocalStorageKeys.Roles, [] as MaybeComputedRef<LocalStorageEntry[]>);
export const useOpenModal = () => useState<string | null>('open-modal', () => null);
export const useOpenDropdown = () => useState<boolean>('open-dropdown', () => false);
export const useSnackbars = () => useToast();
