import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { linkEscapeRegex, linkEscapeReplacer } from '~~/lib/utils/LinkReplacer';

export function markdownToHtml(markdown: string) {
	markdown = markdown.replace(linkEscapeRegex, linkEscapeReplacer).replaceAll('_ _', '');

	return String(
		unified() //
			.use(remarkParse)
			.use(remarkRehype)
			.use(rehypeSanitize)
			.use(rehypeStringify)
			.processSync(markdown)
	)
		.replaceAll(/<blockquote>\n<p>(.+)\n<\/blockquote>/gm, '<discord-quote class="pb-2">$1</discord-quote>')
		.replaceAll(/<strong>(.+?)<\/strong>/g, '<discord-bold>$1</discord-bold>')
		.replaceAll(/<em>(.+?)<\/em>/g, '<discord-italic>$1</discord-italic>')
		.replaceAll(/<code>(.+?)<\/code>/g, '<discord-inline-code>$1</discord-inline-code>')
		.replaceAll(/<pre>/g, '<pre class="bg-[#2f3136] pl-2">')
		.replaceAll('\n', '<div class="pb-0.5" />');
}
