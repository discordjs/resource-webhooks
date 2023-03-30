import { object, string, type SchemaOf } from 'yup';
import { WebhookRegex } from '~~/lib/utils/DiscordRegexes';
import type { LocalStorageEntry } from '~~/lib/utils/localStorage';

export const addOrEditWebhookSchema = (isUpdating: boolean): SchemaOf<LocalStorageEntry> =>
	object({
		value: string()
			.required('The webhook URL is required.')
			.matches(WebhookRegex, 'The webhook URL is invalid.')
			.test(
				'webhook-url-is-unique',
				'The webhook URL is already in use, please enter another one.',
				(value) => isUpdating || !useWebhooks().value.some((webhook) => webhook.value === value)
			),
		label: string()
			.required('The webhook label is required.')
			.min(3, 'The webhook label should at least be 3 characters long.')
			.max(50, 'The webhook label can at most be 50 characters long.')
	});
