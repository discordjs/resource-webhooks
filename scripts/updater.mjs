import { fetch, FetchMethods, FetchResultTypes } from '@sapphire/fetch';
import { stripIndents } from 'common-tags';

const linkEscapeRegex = /\[(.+?)\]\((.+?)\)/gm;
const linkEscapeReplacer = (_, p1, p2) => `[${p1}](<${p2}>)`;

const content = stripIndents`
content
`.replace(linkEscapeRegex, linkEscapeReplacer);

const messageID = '';
const webhookURL = process.env.WEBHOOK_URL ?? '';

try {
	const result = await fetch(
		`${webhookURL}/messages/${messageID}`,
		{
			method: FetchMethods.Patch,
			body: JSON.stringify({
				content,
				allowed_mentions: {
					users: [],
					roles: []
				}
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		},
		FetchResultTypes.Result
	);

	console.log(`${result.status} - ${result.statusText}`);
} catch (error) {
	const errorBody = await error.json();
	console.error(errorBody);
	console.error(`${error.status} - ${error.statusText}`);
}
