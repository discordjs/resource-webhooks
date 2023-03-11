export type PersistedStorageEntry = {
	label: string;
	value: string;
};

export function isPersistedStorageEntry(entry: PersistedStorageEntry | null): entry is PersistedStorageEntry {
	return isObject(entry) && Boolean(entry.value) && Boolean(entry.label);
}

function isObject<T extends Constructor<unknown> = ObjectConstructor>(input: unknown, constructorType?: T): input is object {
	return typeof input === 'object' && input ? input.constructor === (constructorType ?? Object) : false;
}

type Constructor<T> = new (...args: any[]) => T;
