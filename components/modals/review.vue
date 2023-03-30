<template>
	<div class="modal">
		<div class="modal-box relative min-w-full">
			<div v-if="pending">
				<div class="flex items-center justify-center">
					<progress class="progress progress-primary w-1/3"></progress>
				</div>
			</div>
			<div v-else-if="error || !data">
				An error occurred fetching the webhook profile. Please contact the Sapphire developers by joining
				<nuxt-link class="link-secondary link" to="https://discord.gg/sapphiredev" target="_blank">the official Sapphire server</nuxt-link>
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
			</div>
			<div class="mt-5 grid w-full grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4">
				<button type="button" class="btn-error btn" @click="emits('close-modal')">Cancel</button>
				<button v-show="!pending && !error && data !== null" type="button" class="btn-primary btn" @click="handleConfirm">Confirm</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { bold } from '@discordjs/formatters';
import { fetchWebhookProfile } from '~~/lib/api/FetchWebhookProfile';
import { sendWebhookMessage } from '~~/lib/api/SendWebhookMessage';
import { Post } from '~~/lib/types/Post';
import { markdownToHtml } from '~~/lib/utils/MarkdownToHTML';

const emits = defineEmits(['close-modal', 'reset-form']);
const props = defineProps<{ values: Post; isEditing: boolean }>();

const { data, pending, error } = useAsyncData('webhookProfile', () => fetchWebhookProfile(props.values.webhookUrl));
const loadingIndicator = useLoadingIndicator();
const { $toast } = useNuxtApp();

const parseMarkdownishInput = () => {
	let parsedText = props.values.text;
	if (props.values.role && !props.values.text.startsWith(bold('New announcement for'))) {
		parsedText = `${bold('New announcement for')} @${props.values.role.label.replace(/(.+) - \d{18,}/, '$1')}:\n${props.values.text}`;
	}

	return markdownToHtml(parsedText);
};

async function handleConfirm() {
	try {
		loadingIndicator.value = true;

		await sendWebhookMessage(props.values, 'post');

		emits('reset-form');
		emits('close-modal');

		$toast.show({
			type: 'success',
			message: successfullyPostedMessage,
			...defaultToastProps
		});
	} catch (error) {
		$toast.show({
			type: 'denied',
			message: failedToPostMessage,
			...defaultToastProps
		});
	} finally {
		loadingIndicator.value = false;
	}
}
</script>
