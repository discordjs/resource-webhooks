export default function () {
	return useState<boolean>('open-dropdown', () => false);
}
