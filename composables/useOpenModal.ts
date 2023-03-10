export default function () {
	return useState<string | null>('open-modal', () => null);
}
