export const loadState = <T>(key: LocalStorageKeys): T | null => {
	const serializedState = localStorage.getItem(key);
	return serializedState ? (JSON.parse(serializedState) as T) : null;
};

export const saveState = <T>(key: LocalStorageKeys, state: T): T => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem(key, serializedState);
	} catch {
		// intentionally empty
	}

	return state;
};

export const clearState = (key: LocalStorageKeys) => {
	localStorage.removeItem(key);
};

export enum LocalStorageKeys {
	WebhookUrls = 'webhook_urls'
}
