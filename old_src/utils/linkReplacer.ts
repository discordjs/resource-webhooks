export const linkEscapeRegex = /\[(.+?)\]\((https?:\/\/[a-zA-Z.?&\-\/@\d]+)\)/gm;

export function linkEscapeReplacer(_: string, p1: string, p2: string): string {
	return `[${p1}](<${p2}>)`;
}
