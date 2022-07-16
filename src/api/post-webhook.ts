import { isNullish } from '@sapphire/utilities';
import { RouteBases, Routes, type RESTPostAPIChannelMessageResult, type RESTPostAPIWebhookWithTokenJSONBody } from 'discord-api-types/rest/v10';
import type { Post } from '../models/PostModel';
import { linkEscapeRegex, linkEscapeReplacer } from '../utils/linkReplacer';
import { jumpRegex, SapphireServerId } from './constants';
import { bold, roleMention } from './formatters';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function createWebhookPost(params: Post) {
	const bodyWithMentions: RESTPostAPIWebhookWithTokenJSONBody = {
		allowed_mentions: {
			users: [],
			roles: params.role?.value ? [params.role.value] : []
		}
	};

	if (params.mentionRole && params.role) {
		params.text = `${bold('New announcement for')} ${roleMention(params.role.value)}:\n${params.text}`;
	}

	// Get the hookID and hookToken. If it is a release channel then just get the release environment variable.
	const [hookID, hookToken] = params.webhookUrl.split('/').slice(-2);

	params.text = params.text.replace(linkEscapeRegex, linkEscapeReplacer);

	const parts = params.text.split('\n\n');

	// Store a reference to the first message
	let firstMessage: RESTPostAPIChannelMessageResult | null = null;

	// Construct the URL to POST to
	const url = new URL(RouteBases.api + Routes.webhook(hookID, hookToken));
	url.searchParams.append('wait', 'true');

	// Send each of the parts
	for (let part of parts) {
		if (firstMessage) {
			part = part.replace(jumpRegex, `https://discord.com/channels/${SapphireServerId}/${firstMessage.channel_id}/${firstMessage.id}`);
		}

		const body: RESTPostAPIWebhookWithTokenJSONBody = {
			...bodyWithMentions,
			content: part
		};

		const response = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const responseJson = (await response.json()) as RESTPostAPIChannelMessageResult;

		if (isNullish(firstMessage)) {
			firstMessage = responseJson;
		}

		await sleep(1000);
	}
}
