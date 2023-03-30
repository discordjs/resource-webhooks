import { bold, roleMention } from '@discordjs/formatters';
import { promiseTimeout } from '@vueuse/shared';
import { RouteBases, Routes, type RESTPostAPIChannelMessageResult, type RESTPostAPIWebhookWithTokenJSONBody } from 'discord-api-types/rest/v10';
import { Post } from '~~/lib/types/Post';
import { Update } from '~~/lib/types/Update';

const SapphireServerId = '737141877803057244';
const jumpRegex = /%JUMP_TO_TOP%/gm;

export async function sendWebhookMessage(params: Post | Update, fetchMethod: 'post' | 'update') {
	if (!params.webhookUrl?.value || !params.text) return;

	const bodyWithMentions: RESTPostAPIWebhookWithTokenJSONBody = {
		allowed_mentions: {
			users: [],
			roles: params.role?.value ? [params.role.value] : []
		}
	};

	if (params.role && !params.text.startsWith(bold('New announcement for'))) {
		params.text = `${bold('New announcement for')} ${roleMention(params.role.value)}:\n${params.text}`;
	}

	// Get the hookID and hookToken. If it is a release channel then just get the release environment variable.
	const [hookID, hookToken] = params.webhookUrl.value.split('/').slice(-2);

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

		const response = await $fetch<RESTPostAPIChannelMessageResult>(url.toString(), {
			method: fetchMethod === 'post' ? 'POST' : 'PATCH',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (firstMessage === null && parts.length > 1) {
			firstMessage = response;
		}

		if (parts.length > 1) {
			await promiseTimeout(1000);
		}
	}
}
