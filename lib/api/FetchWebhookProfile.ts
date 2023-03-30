import { Result } from '@sapphire/result';
import type { Components } from '@skyra/discord-components-core';
import { RESTGetAPIWebhookWithTokenResult, RouteBases, Routes } from 'discord-api-types/rest/v10';
import { Post } from '~~/lib/types/Post';

export async function fetchWebhookProfile(webhook: Post['webhookUrl'], isUpdating: boolean = false): Promise<Partial<Components.DiscordMessage>> {
	if (!webhook) throw 'No webhook URL provided.';

	const loadingIndicator = useLoadingIndicator();

	const [hookID, hookToken] = webhook.value.split('/').slice(-2);

	if (!hookID || !hookToken) throw 'Unable to extract webhook ID and token.';

	const url = RouteBases.api + Routes.webhook(hookID, hookToken);

	loadingIndicator.value = true;

	const data = await Result.fromAsync<RESTGetAPIWebhookWithTokenResult>(async () => {
		return await $fetch(url, {
			headers: {
				'Content-Type': 'application/json'
			}
		});
	});

	loadingIndicator.value = false;

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
