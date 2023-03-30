<template>
	<div class="mt-5 grid h-full w-full grid-cols-1 px-5">
		<form @submit="onSubmit">
			<modals-review :values="values" :is-editing="false" @close-modal="openModal = null" @reset-form="resetForm()" v-if="openModal === ''" />
			<forms-monaco-editor name="text" label="Message Text" />
			<forms-select
				name="webhookUrl"
				label="Choose the webhook URL to post to"
				addNewOptionHref="/configure/webhooks"
				optionsStringReplacer="webhooks"
				:options="webhookStorage.webhooks"
				class="py-2 lg:py-6"
			/>
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
import { postSchema } from '~~/lib/schemas/postSchema';
import { Post } from '~~/lib/types/Post';

const rolesStorage = useRoles();
const webhookStorage = useWebhooks();
const openModal = useOpenModal();
const { handleSubmit, resetForm, isSubmitting, meta, values } = useForm<Post>({
	initialValues: {
		webhookUrl: null,
		text: '',
		role: null
	},
	validationSchema: postSchema
});

const onInvalidSubmit: InvalidSubmissionHandler<Post> = ({ errors }) => useInvalidFormSubmit(errors);
const onSuccessfulSubmit: SubmissionHandler<Post> = () => (openModal.value = '');

const onSubmit = handleSubmit(onSuccessfulSubmit, onInvalidSubmit);
</script>
