import type { RESTPostAPIChannelMessageResult } from 'discord-api-types/v6';
import { WebhookClient } from 'discord.js';
import { readdir, readFile } from 'fs/promises';
import { URL } from 'url';
import { promisify } from 'util';

/* Regexes and utility functions */

const jumpRegex = /%JUMP_TO_TOP%/gm;

const imagesBaseUrl = 'https://raw.githubusercontent.com/sapphiredev/resource-webhooks/main/resources/images';
const linkEscapeRegex = /\[(.+?)\]\((.+?)\)/gm;
const resolveIdentifier = (channelName: string): string => channelName.toUpperCase().replace(/-/gm, '_');
const linkEscapeReplacer = (_: any, p1: string, p2: string): string => `[${p1}](<${p2}>)`;

const replacePatterns: Record<string, string> = {} as const;

const wait: {
	(ms: number): Promise<void>;
	<T>(ms: number, value: T): Promise<T>;
} = promisify(setTimeout);

/* Start processing */

const deployChannelString = process.env.DEPLOY_CHANNELS;
const channels = deployChannelString
	?.trim()
	.split(/ *, */gm)
	.map((c) => resolveIdentifier(c));

if (!channels) {
	throw new Error(`[MISSING] No deploy channels provided`);
}

const resourcesDir = new URL('../resources/', import.meta.url);

const files = await readdir(resourcesDir);

const missingHooks = channels.filter((c) => !Boolean(process.env[c]));
const missingFiles = channels.filter((c) => !files.includes(`${c}.md`));

if (missingHooks.length) {
	throw new Error(`[MISSING] No webhook environment variable(s) for ${missingHooks.join(', ')}`);
}

if (missingFiles.length) {
	throw new Error(`[MISSING] No file for ${missingFiles.map((c) => `${c}.md`).join(', ')}`);
}

for (const channel of channels) {
	console.log(`[STARTING] Deploying ${channel}`);

	const [hookID, hookToken] = process.env[channel]!.split('/').slice(-2);
	const hook = new WebhookClient(hookID, hookToken);
	const fileName = `${channel}.md`;

	const raw = await readFile(new URL(fileName, resourcesDir), { encoding: 'utf8' });
	const r1 = raw.replace(linkEscapeRegex, linkEscapeReplacer);
	const r2 = Object.entries(replacePatterns).reduce((acc, [k, v]) => {
		const regex = new RegExp(k, 'gm');
		return acc.replace(regex, v);
	}, r1);
	const r3 = r2.replace(/%PNG_([A-Z_]+)%/gm, `${imagesBaseUrl}/${channel}/$1.png`);

	const parts = r3.split('\n\n');

	let firstMessage: RESTPostAPIChannelMessageResult | null = null;

	for (let part of parts) {
		if (firstMessage) {
			part = part.replace(jumpRegex, `https://discord.com/channels/737141877803057244/${firstMessage.channel_id}/${firstMessage.id}`);
		}

		// A raw API response is returned here, not a Message object as the typings indicate
		const response = (await hook.send(part, {
			avatarURL: process.env.WEBHOOK_AVATAR,
			username: process.env.WEBHOOK_NAME,
			allowedMentions: {
				users: [],
				roles: []
			}
		})) as unknown as RESTPostAPIChannelMessageResult;

		if (!firstMessage) firstMessage = response;

		await wait(1000);
	}

	hook.destroy();
}
