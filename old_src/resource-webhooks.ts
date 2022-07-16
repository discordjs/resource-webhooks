import { fetch, FetchMethods, FetchResultTypes } from '@sapphire/fetch';
import { RouteBases, Routes, type RESTPostAPIChannelMessageResult, type RESTPostAPIWebhookWithTokenJSONBody } from 'discord-api-types/v10';
import { readdir, readFile } from 'node:fs/promises';
import { platform, release } from 'node:os';
import { setTimeout as wait } from 'node:timers/promises';
import { URL } from 'node:url';

/* Regexes, constants, and utility functions */
const jumpRegex = /%JUMP_TO_TOP%/gm;

const FetchUserAgent = `Sapphire Resource Webhooks/2.0.0 (fetch) ${platform()}/${release()} (https://github.com/sapphiredev/resource-webhooks/tree/main)`;
const SapphireServerId = '737141877803057244';
const imagesBaseUrl = 'https://raw.githubusercontent.com/sapphiredev/resource-webhooks/main/resources/images';
const replacePatterns: Record<string, string> = {} as const;
const linkEscapeRegex = /\[(.+?)\]\((.+?)\)/gm;
const resolveIdentifier = (channelName: string): string => channelName.toUpperCase().replace(/-/gm, '_');
const linkEscapeReplacer = (_: any, p1: string, p2: string): string => `[${p1}](<${p2}>)`;
const isDraft = (channelName: string) => channelName.toLowerCase().startsWith('draft');
const isAnnouncement = (channelName: string) => channelName.toLowerCase().startsWith('announcement');
const transformDraftToRelease = (channelName: string) => channelName.replace('DRAFT', 'ANNOUNCEMENT');

const baseBody: RESTPostAPIWebhookWithTokenJSONBody = {
	avatar_url: process.env.WEBHOOK_AVATAR,
	username: process.env.WEBHOOK_NAME
};

/* Start processing */

const deployChannelString = process.env.DEPLOY_CHANNELS;
const channels = deployChannelString
	?.trim()
	.split(/ *, */gm)
	.map((c) => resolveIdentifier(c));

// If there are no channels provided through GitHub inputs then throw
if (!channels) {
	throw new Error(`[MISSING] No deploy channels provided`);
}

// Get the resources directory
const resourcesDir = new URL('../resources/', import.meta.url);

// Read the files in the directory
const files = await readdir(resourcesDir);

// Check if there are any hooks missing, for announcements we specifically check for the announcement webhook.
const missingHooks = channels.filter((c) => {
	if (isAnnouncement(c)) {
		return !Boolean(process.env.ANNOUNCEMENT);
	}

	if (isDraft(c)) {
		return !Boolean(process.env.DRAFT);
	}

	return !Boolean(process.env[c]);
});

// Check if there are any files missing
const missingFiles = channels.filter((c) => {
	if (isDraft(c)) {
		return !files.includes(`${transformDraftToRelease(c)}.md`);
	}

	return !files.includes(`${c}.md`);
});

if (missingHooks.length) {
	throw new Error(`[MISSING] No webhook environment variable(s) for ${missingHooks.join(', ')}`);
}

if (missingFiles.length) {
	throw new Error(`[MISSING] No file for ${missingFiles.map((c) => `${c}.md`).join(', ')}`);
}

// Iterate over all the channels and their respective "channelWithoutDate" entry
for (const channel of channels) {
	console.log(`[STARTING] Deploying ${channel}`);

	// The env var to use
	const envVarToUse = isAnnouncement(channel) ? 'ANNOUNCEMENT' : isDraft(channel) ? 'DRAFT' : channel;
	const roleToMention = isAnnouncement(channel) ? '912088476290273300' : isDraft(channel) ? '901237389257744426' : null;

	const bodyWithMentions: RESTPostAPIWebhookWithTokenJSONBody = {
		...baseBody,
		allowed_mentions: {
			users: [],
			roles: roleToMention ? [roleToMention] : []
		}
	};

	// Get the hookID and hookToken. If it is a release channel then just get the release environment variable.
	const [hookID, hookToken] = process.env[envVarToUse]!.split('/').slice(-2);

	// Get the proper file name
	const fileName = `${transformDraftToRelease(channel)}.md`;

	// Read the file and replace some content in it to make it Discord message ready
	const raw = await readFile(new URL(fileName, resourcesDir), { encoding: 'utf8' });

	const r1 = isAnnouncement(channel) || isDraft(channel) ? `**New announcement for** <@&${roleToMention}>:\n${raw}` : raw;
	const r2 = r1.replace(linkEscapeRegex, linkEscapeReplacer);

	const parts = r2.split('\n\n');

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

		const response = await fetch<RESTPostAPIChannelMessageResult>(
			url,
			{
				method: FetchMethods.Post,
				body: JSON.stringify(body),
				headers: {
					'Content-Type': 'application/json',
					'User-Agent': FetchUserAgent
				}
			},
			FetchResultTypes.JSON
		);

		if (!firstMessage) firstMessage = response;

		await wait(1000);
	}
}
