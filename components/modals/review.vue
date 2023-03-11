<template>
	<div class="modal">
		<div class="modal-box relative min-w-full">
			<div v-if="pending">
				<div class="flex items-center justify-center">
					<progress class="progress progress-primary w-1/3"></progress>
				</div>
			</div>
			<div v-else-if="error || !data">
				<div class="grid h-[calc(100vh_-_64px)] place-content-center p-8">
					<div class="flex w-full flex-row flex-wrap items-center gap-2">
						<div class="grow-0 basis-full md:basis-[50%]">
							An error occurred fetching the webhook profile. Please contact the Sapphire developers by joining
							<nuxt-link to="https://discord.gg/sapphiredev" target="_blank">the official Sapphire server</nuxt-link>
						</div>
						<nuxt-link class="btn btn-primary w-full normal-case md:w-40" to="https://discord.gg/sapphiredev" target="_blank"
							>Support</nuxt-link
						>
					</div>
				</div>
			</div>
			<div v-else>
				<discord-messages>
					<discord-message
						:bot="true"
						:avatar="data.avatar"
						:author="data.author"
						:ephemeral="data.ephemeral"
						:edited="data.edited"
						:timestamp="data.timestamp"
						:twenty-four="data.twentyFour"
					>
						<div v-html="parseMarkdownishInput()"></div>
					</discord-message>
				</discord-messages>
				<div class="mt-5 grid w-full grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4">
					<button type="button" class="btn btn-error" @click="emits('close-modal')">Cancel</button>
					<button type="button" class="btn btn-primary" @click="handleConfirm">Confirm</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { bold } from '@discordjs/formatters';
import { fetchWebhookProfile } from '~~/lib/api/FetchWebhookProfile';
import { Post } from '~~/lib/types/Post';
import { markdownToHtml } from '~~/lib/utils/MarkdownToHTML';

const emits = defineEmits(['close-modal']);
const props = defineProps<{ values: Post; isEditing: boolean }>();

const { data, pending, error } = useAsyncData('webhookProfile', () => fetchWebhookProfile(props.values.webhookUrl));

const parseMarkdownishInput = () => {
	let parsedText = props.values.text;
	if (props.values.role && !props.values.text.startsWith(bold('New announcement for'))) {
		parsedText = `${bold('New announcement for')} @${props.values.role.label.replace(/(.+) - \d{18,}/, '$1')}:\n${props.values.text}`;
	}

	return markdownToHtml(parsedText);
};

function handleConfirm() {
	console.log('test');
	console.log(JSON.stringify(props.values, null, 2));
	// handleClose();
}
</script>
