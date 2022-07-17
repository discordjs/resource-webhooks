import { fetch, FetchMethods, FetchResultTypes } from '@sapphire/fetch';
import { isNullish } from '@sapphire/utilities';
import { RouteBases, Routes, type RESTPostAPIChannelMessageResult, type RESTPostAPIWebhookWithTokenJSONBody } from 'discord-api-types/rest/v10';
import type { Post } from '../models/PostModel';
import type { Update } from '../models/UpdateModel';
import { linkEscapeRegex, linkEscapeReplacer } from '../utils/linkReplacer';
import { jumpRegex, SapphireServerId, sleep } from './constants';
import { bold, roleMention } from './formatters';

export async function sendWebhookMessage(params: Post | Update, fetchMethod: 'post' | 'update') {
	const bodyWithMentions: RESTPostAPIWebhookWithTokenJSONBody = {
		allowed_mentions: {
			users: [],
			roles: params.role?.value ? [params.role.value] : []
		}
	};

	if (params.mentionRole && params.role && !params.text.startsWith(bold('New announcement for'))) {
		params.text = `${bold('New announcement for')} ${roleMention(params.role.value)}:\n${params.text}`;
	}

	// Get the hookID and hookToken. If it is a release channel then just get the release environment variable.
	const [hookID, hookToken] = params.webhookUrl.split('/').slice(-2);

	params.text = params.text.replace(linkEscapeRegex, linkEscapeReplacer);

	let parts = [params.text];

	// Store a reference to the first message
	let firstMessage: RESTPostAPIChannelMessageResult | null = null;

	// Construct the URL to POST to
	let url: URL;

	if (fetchMethod === 'post') {
		url = new URL(RouteBases.api + Routes.webhook(hookID, hookToken));
		url.searchParams.append('wait', 'true');

		parts = params.text.split('\n\n');
	} else {
		url = new URL(RouteBases.api + Routes.webhookMessage(hookID, hookToken, (params as Update).messageId));
	}

	// Send each of the parts
	for (let part of parts) {
		if (firstMessage) {
			part = part.replace(jumpRegex, `https://discord.com/channels/${SapphireServerId}/${firstMessage.channel_id}/${firstMessage.id}`);
		}

		const body: RESTPostAPIWebhookWithTokenJSONBody = {
			...bodyWithMentions,
			content: part
		};

		const response = await fetch<RESTPostAPIChannelMessageResult>(
			url,
			{
				method: fetchMethod === 'post' ? FetchMethods.Post : FetchMethods.Patch,
				body: JSON.stringify(body),
				headers: {
					'Content-Type': 'application/json'
				}
			},
			FetchResultTypes.JSON
		);

		if (isNullish(firstMessage) && parts.length > 1) {
			firstMessage = response;
		}

		if (parts.length > 1) {
			await sleep(1000);
		}
	}
}
