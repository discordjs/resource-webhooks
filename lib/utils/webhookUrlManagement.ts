import { LocalStorageEntry } from '~~/lib/utils/localStorage';

export function getAllStoredWebhookUrls(): LocalStorageEntry[] {
	return loadState(LocalStorageKeys.WebhookUrls);
}

export function removeWebhookUrl(id: string): void {
	const webhookUrls = getAllStoredWebhookUrls();
	const newWebhookUrls = webhookUrls.filter((webhookUrl) => webhookUrl.value !== id);
	return saveState(LocalStorageKeys.WebhookUrls, newWebhookUrls);
}

export function addWebhookUrl(webhookUrl: LocalStorageEntry): void {
	const webhookUrls = getAllStoredWebhookUrls();
	const newWebhookUrls = [...webhookUrls, webhookUrl];
	return saveState(LocalStorageKeys.WebhookUrls, newWebhookUrls);
}
