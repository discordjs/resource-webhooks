import { RouteBases, Routes, type RESTGetAPIChannelMessageResult } from 'discord-api-types/rest/v10';
import type { UseFormReturn } from 'react-hook-form';
import type { Post } from '../models/PostModel';
import type { Update } from '../models/UpdateModel';

export async function fetchWebhookMessage(formContext: UseFormReturn<Post | Update>): Promise<void> {
	const [webhookUrl, messageId] = formContext.getValues(['webhookUrl', 'messageId']);

	const [hookID, hookToken] = webhookUrl.split('/').slice(-2);

	const url = new URL(RouteBases.api + Routes.webhookMessage(hookID, hookToken, messageId));

	const response = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const responseJson = (await response.json()) as RESTGetAPIChannelMessageResult;

	formContext.setValue('text', responseJson.content, { shouldValidate: true });
}
