export function emptyStringAndZeroToUndefined(value: number, originalValue: string | number | null): number | undefined {
	if ((typeof originalValue === 'string' && originalValue === '') || value === 0) {
		return undefined;
	}

	return value;
}

export function emptyStringToUndefined(value: number, originalValue: string | number | null): number | undefined {
	if (typeof originalValue === 'string' && originalValue === '') {
		return undefined;
	}

	return value;
}
