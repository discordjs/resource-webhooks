import { fetch, FetchMethods, FetchResultTypes } from '@sapphire/fetch';
import type { Components } from '@skyra/discord-components-core';
import { RESTGetAPIWebhookWithTokenResult, RouteBases, Routes } from 'discord-api-types/rest/v10';
import type { UseFormReturn } from 'react-hook-form';
import type { Post } from '../models/PostModel';
import type { Update } from '../models/UpdateModel';
import { isLocalStorageEntry } from '../utils/localStorage';

export async function fetchWebhookProfile(
	formContext: UseFormReturn<Post | Update>,
	{ isEdited }: { isEdited: boolean }
): Promise<Partial<Components.DiscordMessage> | null> {
	let webhookUrl = formContext.getValues('webhookUrl');

	webhookUrl = isLocalStorageEntry(webhookUrl) ? webhookUrl.value : webhookUrl;

	const [hookID, hookToken] = webhookUrl.split('/').slice(-2);

	if (!hookID || !hookToken) {
		return null;
	}

	const url = new URL(RouteBases.api + Routes.webhook(hookID, hookToken));

	const response = await fetch<RESTGetAPIWebhookWithTokenResult>(
		url,
		{
			method: FetchMethods.Get,
			headers: {
				'Content-Type': 'application/json'
			}
		},
		FetchResultTypes.JSON
	);

	return {
		avatar: `https://cdn.discordapp.com/avatars/${response.id}/${response.avatar}.png?size=4096`,
		author: response.name ?? 'Configured Webhook',
		ephemeral: false,
		bot: true,
		edited: isEdited,
		timestamp: new Date(),
		twentyFour: true
	};
}
