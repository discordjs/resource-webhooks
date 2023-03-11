import { Result } from '@sapphire/result';
import type { Components } from '@skyra/discord-components-core';
import { RESTGetAPIWebhookWithTokenResult, RouteBases, Routes } from 'discord-api-types/rest/v10';
import { isPersistedStorageEntry } from '~~/lib/types/PersistedStorageEntry';
import { Post } from '~~/lib/types/Post';

export async function fetchWebhookProfile(webhook: Post['webhookUrl'], isUpdating: boolean = false): Promise<Partial<Components.DiscordMessage>> {
	let webhookUrl = isPersistedStorageEntry(webhook) ? webhook.value : webhook;

	if (!webhookUrl) throw 'No webhook URL provided.';

	const [hookID, hookToken] = webhookUrl.split('/').slice(-2);

	if (!hookID || !hookToken) throw 'Unable to extract webhook ID and token.';

	const url = RouteBases.api + Routes.webhook(hookID, hookToken);

	const data = await Result.fromAsync<RESTGetAPIWebhookWithTokenResult>(async () => {
		return await $fetch(url, {
			headers: {
				'Content-Type': 'application/json'
			}
		});
	});

	return data.match({
		err: () => {
			throw 'Unable to fetch webhook profile.';
		},
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
