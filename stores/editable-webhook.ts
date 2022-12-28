import { acceptHMRUpdate, defineStore } from 'pinia';
import { LocalStorageEntry } from '~~/lib/utils/localStorage';

export const useEditableWebhook = defineStore('editable-webhook', {
	state: (): LocalStorageEntry => ({
		value: '',
		label: ''
	}),

	actions: {
		setWebhook(webhook: LocalStorageEntry) {
			this.value = webhook.value;
			this.label = webhook.label;
		}
	}
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useEditableWebhook, import.meta.hot));
}
