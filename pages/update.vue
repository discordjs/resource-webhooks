<template>
	<div class="mt-5 grid h-full w-full grid-cols-1 px-5">
		<form @submit="onSubmit">
			<modals-review :values="values" :is-editing="true" @close-modal="openModal = null" @reset-form="resetForm()" v-if="openModal === ''" />
			<forms-monaco-editor name="text" label="Message Text" />
			<forms-select
				name="webhookUrl"
				label="Choose the webhook URL to post to"
				addNewOptionHref="/configure/webhooks"
				optionsStringReplacer="webhooks"
				:options="webhookStorage.webhooks"
				class="pt-2 lg:pt-3"
			/>
			<forms-input name="messageId" label="Message id to update" />
			<button
				type="button"
				class="btn-shadow btn-primary btn w-full"
				:disabled="!values.messageId || !values.webhookUrl"
				@click="getMessageContent()"
			>
				Fetch webhook message content from Discord
			</button>
			<forms-select
				name="role"
				label="Optionally choose a role to mention"
				addNewOptionHref="/configure/roles"
				optionsStringReplacer="roles"
				:options="rolesStorage.roles"
			/>
			<div class="mt-5 grid w-full grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4">
				<button type="button" class="btn-shadow btn-accent btn" @click="resetForm()">Reset form</button>
				<button type="submit" class="btn-shadow btn-primary btn" :disabled="isSubmitting || !meta.dirty || !meta.valid">Review post</button>
			</div>
		</form>
	</div>
</template>

<script setup lang="ts">
import { useForm, type InvalidSubmissionHandler, type SubmissionHandler } from 'vee-validate';
import { fetchWebhookMessage } from '~~/lib/api/FetchWebhookMessage';
import { updateSchema } from '~~/lib/schemas/updateSchema';
import { Update } from '~~/lib/types/Update';

const rolesStorage = useRoles();
const webhookStorage = useWebhooks();
const openModal = useOpenModal();
const { handleSubmit, resetForm, isSubmitting, meta, values, setFieldValue } = useForm<Update>({
	initialValues: {
		webhookUrl: null,
		text: '',
		role: null,
		messageId: ''
	},
	validationSchema: updateSchema
});

const loadingIndicator = useLoadingIndicator();
const { $toast } = useNuxtApp();

const onInvalidSubmit: InvalidSubmissionHandler<Update> = ({ errors }) => useInvalidFormSubmit(errors);
const onSuccessfulSubmit: SubmissionHandler<Update> = () => (openModal.value = '');

const onSubmit = handleSubmit(onSuccessfulSubmit, onInvalidSubmit);

async function getMessageContent() {
	loadingIndicator.value = true;

	const data = await fetchWebhookMessage(values);

	if (data) {
		setFieldValue('text', data);
		$toast.show({
			type: 'success',
			message: 'Set the content from Discord to the text input field',
			timeout: 10,
			pauseOnHover: true
		});
	} else {
		$toast.show({
			type: 'danger',
			message: 'Failed to fetch message from Discord',
			timeout: 10,
			pauseOnHover: true
		});
	}

	loadingIndicator.value = false;
}
</script>
