<template>
	<div class="modal">
		<div class="modal-box relative">
			<discord-messages v-if="webhookProfile !== null">
				<discord-message
					:bot="true"
					:avatar="webhookProfile.avatar"
					:author="webhookProfile.author"
					:ephemeral="webhookProfile.ephemeral"
					:edited="webhookProfile.edited"
					:timestamp="webhookProfile.timestamp"
					:twenty-four="webhookProfile.twentyFour"
				>
					<div v-html="parseMarkdownishInput()"></div>
				</discord-message>
			</discord-messages>
			<div class="mt-5 grid w-full grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4">
				<button type="button" class="btn btn-error" @click="$emit('close-modal')">Cancel</button>
				<button type="button" class="btn btn-primary" @click="handleConfirm">Confirm</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { bold } from '@discordjs/formatters';
import { fetchWebhookProfile } from '~~/lib/api/FetchWebhookProfile';
import { Post } from '~~/lib/types/Post';
import { linkEscapeRegex, linkEscapeReplacer } from '~~/lib/utils/LinkReplacer';
import { markdownToHtml } from '~~/lib/utils/MarkdownToHTML';

defineEmits(['close-modal']);

const props = defineProps<{ values: Post; isEditing: boolean }>();

const webhookProfile = await fetchWebhookProfile(props.values.webhookUrl);

const parseMarkdownishInput = () => {
	let parsedText = props.values.text;
	if (props.values.role && !props.values.text.startsWith(bold('New announcement for'))) {
		parsedText = `${bold('New announcement for')} @${props.values.role.label.replace(/(.+) - \d{18,}/, '$1')}:\n${props.values.text}`;
	}

	return markdownToHtml(
		parsedText //
			.replace(linkEscapeRegex, linkEscapeReplacer)
			.replaceAll('_ _', '')
	).replaceAll('\n', '<br />');
};

function handleConfirm() {
	console.log('test');
	console.log(JSON.stringify(props.values, null, 2));
	// handleClose();
}
</script>
