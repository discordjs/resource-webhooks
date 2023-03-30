export default function () {
	return useState<boolean>('loading-indicator', () => false);
}
