import fetch from 'node-fetch';
import { stripIndents } from 'common-tags';

const content = stripIndents`
content
`;

const messageID = '';
const webhookURL = process.env.WEBHOOK_URL ?? '';

try {
	const result = await fetch(`${webhookURL}/messages/${messageID}`, {
		method: 'PATCH',
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
	});

	console.log(`${result.status} - ${result.statusText}`);
} catch (error) {
	const errorBody = await error.json();
	console.error(errorBody);
	console.error(`${error.status} - ${error.statusText}`);
}
