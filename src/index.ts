import { readdir, readFile } from 'fs/promises';
import { URL } from 'url';
import { promisify } from 'util';
import { APIMessage } from 'discord-api-types/v10';
import { WebhookClient, hyperlink, hideLinkEmbed } from 'discord.js';

const jumpRegex = /%JUMP_TO_TOP%/gm;

const linkEscapeRegex = /\[(.+?)\]\((.+?)\)/gm;
const linkEscapeReplacer = (_: any, p1: string, p2: string): string => hyperlink(p1, hideLinkEmbed(p2));

const replacePatterns = {
	'%RULES_CHANNEL%': '<#222109930545610754>',
	'%RESOURCES_CHANNEL%': '<#729580210634358804>',
	'%USEFUL_SERVERS_CHANNEL%': '<#237743386864517122>',
	'%HELP_V13_CHANNEL%': '<#874431116533178459>',
	'%HELP_V14_CHANNEL%': '<#824411059443204127>',
	'%HELP_FORUM_CHANNEL%': '<#986520997006032896>',
	'%HELP_VOICE_FORUM_CHANNEL%': '<#998942774994927646>',
	'%OTHER_JS_FORUM_CHANNEL%': '<#1081585952654360687>',
	'%TAG_COMMAND%': '</tag:867892466544148520>',
	'%COMMAND_REPORT_USER%': '</report user:1020072425448284263>',
	'%COMMAND_REPORT_MESSAGE%': '</report message:1020072425448284263>',
	'%GET_HELP_CHANNEL%': '<#1115899560183730286>',
	'%MENTION_MODS%': '<@&839912195994812420>',
} as const;

const resolveIdentifier = (channelName: string): string => channelName.toUpperCase().replace(/-/gm, '_');

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
