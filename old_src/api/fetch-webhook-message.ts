import { fetch, FetchMethods, FetchResultTypes } from '@sapphire/fetch';
import { RouteBases, Routes, type RESTGetAPIChannelMessageResult } from 'discord-api-types/rest/v10';
import type { UseFormReturn } from 'react-hook-form';
import type { Post } from '../models/PostModel';
import type { Update } from '../models/UpdateModel';
import { isLocalStorageEntry } from '../utils/localStorage';

export async function fetchWebhookMessage(formContext: UseFormReturn<Post | Update>): Promise<void> {
	let [webhookUrl, messageId] = formContext.getValues(['webhookUrl', 'messageId']);

	webhookUrl = isLocalStorageEntry(webhookUrl) ? webhookUrl.value : webhookUrl;

	const [hookID, hookToken] = webhookUrl.split('/').slice(-2);

	const url = new URL(RouteBases.api + Routes.webhookMessage(hookID, hookToken, messageId));

	const response = await fetch<RESTGetAPIChannelMessageResult>(
		url,
		{
			method: FetchMethods.Get,
			headers: {
				'Content-Type': 'application/json'
			}
		},
		FetchResultTypes.JSON
	);

	formContext.setValue('text', response.content, { shouldValidate: true });
}
