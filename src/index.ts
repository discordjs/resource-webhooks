import { APIMessage } from 'discord-api-types/v9';
import { WebhookClient } from 'discord.js';
import { readdir, readFile } from 'fs/promises';
import { URL } from 'url';
import { promisify } from 'util';

const jumpRegex = /%JUMP_TO_TOP%/gm;

const linkEscapeRegex = /\[(.+?)\]\((.+?)\)/gm;
const linkEscapeReplacer = (_: any, p1: string, p2: string): string => {
	return `[${p1}](<${p2}>)`;
};

const replacePatterns = {
	'%RULES_CHANNEL%': '<#222109930545610754>',
	'%RESOURCES_CHANNEL%': '<#729580210634358804>',
	'%USEFUL_SERVERS_CHANNEL%': '<#237743386864517122>',
} as const;

function resolveIdentifier(channelName: string): string {
	return channelName.toUpperCase().replace(/-/gm, '_');
}

const wait = promisify(setTimeout);

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

	const hook = new WebhookClient({ url: process.env[channel]! });
	const fileName = `${channel}.md`;

	const raw = await readFile(new URL(fileName, resourcesDir), { encoding: 'utf8' });
	const r1 = raw.replace(linkEscapeRegex, linkEscapeReplacer).replace(/"/g, '\\"');
	const r2 = Object.entries(replacePatterns).reduce((acc, [k, v]) => acc.replace(new RegExp(k, 'gm'), v), r1);
	const parts = r2.split('\n\n');

	let firstMessage: APIMessage | null = null;
	for (let part of parts) {
		if (firstMessage) {
			part = part.replace(
				jumpRegex,
				`https://discord.com/channels/222078108977594368/${firstMessage.channel_id}/${firstMessage.id}`,
			);
		}
		// A raw API response is returned here, not a Message object as the typings indicate
		const response = await hook.send({
			avatarURL: process.env.WEBHOOK_AVATAR,
			content: part,
			username: process.env.WEBHOOK_NAME,
			allowedMentions: {
				users: [],
				roles: [],
			},
		});
		firstMessage ??= response;

		await wait(1000);
	}
	hook.destroy();
}
