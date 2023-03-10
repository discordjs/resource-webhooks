import type { PersistedStorageEntry } from '~~/lib/types/PersistedStorageEntry';

interface WebhooksState {
	webhooks: PersistedStorageEntry[];
}

export const useWebhooks = defineStore('webhooks', {
	state: (): WebhooksState => ({
		webhooks: [] as PersistedStorageEntry[]
	}),

	persist: {
		storage: persistedState.cookiesWithOptions({
			sameSite: 'strict'
		})
	},

	actions: {
		addWebhook(webhook: PersistedStorageEntry) {
			if (!this.hasWebhook(webhook.value)) {
				this.webhooks.push(webhook);
			}
		},

		removeWebhook(url: string) {
			this.webhooks = this.webhooks.filter((webhook) => url !== webhook.value);
		},

		hasWebhook(url: string) {
			return this.webhooks.some((webhook) => webhook.value === url);
		}
	}
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useWebhooks, import.meta.hot));
}
