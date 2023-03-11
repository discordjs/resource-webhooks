import { Result } from '@sapphire/result';
import type { Components } from '@skyra/discord-components-core';
import { RESTGetAPIWebhookWithTokenResult, RouteBases, Routes } from 'discord-api-types/rest/v10';
import { isPersistedStorageEntry } from '~~/lib/types/PersistedStorageEntry';
import { Post } from '~~/lib/types/Post';

export async function fetchWebhookProfile(
	webhook: Post['webhookUrl'],
	isUpdating: boolean = false
): Promise<Partial<Components.DiscordMessage> | null> {
	let webhookUrl = isPersistedStorageEntry(webhook) ? webhook.value : webhook;

	if (!webhookUrl) return null;

	const [hookID, hookToken] = webhookUrl.split('/').slice(-2);

	if (!hookID || !hookToken) {
		return null;
	}

	const url = RouteBases.api + Routes.webhook(hookID, hookToken);

	const data = await Result.fromAsync<RESTGetAPIWebhookWithTokenResult>(async () => {
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		return response.json() as Promise<RESTGetAPIWebhookWithTokenResult>;
	});

	return data.match({
		err: () => null,
		ok: (dt) => ({
			avatar: `https://cdn.discordapp.com/avatars/${dt.id}/${dt.avatar}.png?size=4096`,
			author: dt.name ?? 'Configured Webhook',
			ephemeral: false,
			bot: true,
			edited: isUpdating,
			timestamp: new Date(),
			twentyFour: true
		})
	});
}
