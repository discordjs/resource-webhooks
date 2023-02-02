<template>
	<div class="grid grid-cols-1 w-full mt-5 px-5 h-full">
		<Form
			@submit="onSubmit"
			@invalid-submit="onInvalidSubmit"
			:validation-schema="postSchema"
			:initial-values="initialValues"
			v-slot="{ resetForm, isSubmitting, meta }"
		>
			<forms-monaco-editor name="text" label="Message Text" />
			<forms-select
				name="webhookUrl"
				label="Choose the webhook URL to post to"
				addNewOptionHref="/configure/webhooks"
				optionsStringReplacer="webhooks"
				:options="webhooks"
				class="py-2 lg:py-6"
			/>
			<forms-select
				name="role"
				label="Optionally choose a role to mention"
				addNewOptionHref="/configure/roles"
				optionsStringReplacer="roles"
				:options="getAllStoredRoles()"
			/>
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4 w-full mt-5">
				<button type="button" class="btn btn-accent btn-shadow" @click="resetForm()">Reset form</button>
				<button type="submit" class="btn btn-primary btn-shadow" :disabled="isSubmitting || !meta.valid">Review post</button>
			</div>
		</Form>
	</div>
</template>

<script setup lang="ts">
import { Form, type InvalidSubmissionContext } from 'vee-validate';
import { postSchema } from '~~/lib/schemas/postSchema';
import { Post } from '~~/lib/types/Post';

const webhooks = useWebhooks();

const onInvalidSubmit = ({ errors }: InvalidSubmissionContext) => useInvalidFormSubmit(errors);

const initialValues: Post = {
	webhookUrl: '',
	text: '',
	role: ''
};

function onSubmit(values: Record<string, unknown>) {
	console.log('test');
	console.log(JSON.stringify(values, null, 2));
}
</script>
