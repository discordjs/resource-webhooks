import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import fetch from 'node-fetch';
import { promisify } from 'util';

const linkEscapeRegex = /\[(.+?)\]\((.+?)\)/gm;
const linkEscapeReplacer = (_: any, p1: string, p2: string): string => {
	return `[${p1}](<${p2}>)`;
};
const wait = promisify(setTimeout);

const replacePatterns = {
	'%RULES_CHANNEL%': '<#753589134970323075>',
	'%RESOURCES_CHANNEL%': '<#753589089290420225>',
	'%USEFUL_SERVERS_CHANNEL%': '<#753589122714828881>',
} as const;

function resolveIdentifier(channelName: string): string {
	return channelName.toUpperCase().replace(/-/gm, '_');
}

async function main(): Promise<void> {
	const deployChannelString = process.env.DEPLOY_CHANNELS;
	const channels = deployChannelString
		?.trim()
		.split(/ *, */gm)
		.map((c) => resolveIdentifier(c));

	if (!channels) {
		throw new Error(`[MISSING] No deploy channels provided`);
	}

	const files = readdirSync(join(__dirname, '..', 'resources'));
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

		const hook = process.env[channel]!;
		const fileName = `${channel}.md`;

		const raw = readFileSync(join(__dirname, '..', 'resources', fileName)).toString();
		const r1 = raw.replace(linkEscapeRegex, linkEscapeReplacer).replace(/"/g, '\\"');
		const r2 = Object.entries(replacePatterns).reduce((acc, [k, v]) => {
			const regex = new RegExp(k, 'gm');
			return acc.replace(regex, v);
		}, r1);
		const parts = r2.split('\n\n');

		for (const part of parts) {
			const body = {
				avatar_url: process.env.WEBHOOK_AVATAR,
				username: process.env.WEBHOOK_NAME,
				content: part,
			};

			const res = await fetch(hook, {
				method: 'post',
				body: JSON.stringify(body),
				headers: { 'Content-Type': 'application/json' },
			});

			if (res.status !== 204) {
				console.error(await res.json());
				throw new Error(`[API] ${res.status}: ${res.statusText}`);
			}
			await wait(1000);
		}
	}
}

void main();
