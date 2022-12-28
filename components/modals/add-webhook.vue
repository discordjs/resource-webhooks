<template>
	<input type="checkbox" id="add-webhook-modal" class="modal-toggle" />
	<label for="add-webhook-modal" class="modal cursor-pointer">
		<label class="modal-box relative" for="">
			<label for="add-webhook-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
			<h3 class="text-lg font-bold">Add a new Webhook URL</h3>
			<Form
				@submit="onSubmit"
				@invalid-submit="onInvalidSubmit"
				:validation-schema="addOrEditNewWebhookSchema"
				:initial-values="{ value: editableWebhookStore.value, label: editableWebhookStore.label }"
				v-slot="{ resetForm, errors, isSubmitting, meta }"
			>
				<forms-input name="label" label="Label" />
				<forms-input name="value" label="Webhook URL" />
				<p>{{ errors }}</p>
				<p>{{ isSubmitting }}</p>
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4 w-full mt-5">
					<button type="button" class="btn btn-accent" @click="resetForm()">Reset form</button>
					<button type="submit" class="btn btn-primary" :disabled="isSubmitting || !meta.valid">Add Webhook URL</button>
				</div>
			</Form>
		</label>
	</label>
</template>

<script setup lang="ts">
import { cast } from '@sapphire/utilities';
import { Form, type InvalidSubmissionContext } from 'vee-validate';
import { addOrEditNewWebhookSchema } from '~~/lib/schemas/addOrEditNewWebhookSchema';
import { LocalStorageEntry } from '~~/lib/utils/localStorage';

const editableWebhookStore = useEditableWebhook();
const onInvalidSubmit = ({ errors }: InvalidSubmissionContext) => useInvalidFormSubmit(errors);

function onSubmit(_values: Record<string, unknown>) {
	addWebhookUrl(cast<LocalStorageEntry>(_values));
	editableWebhookStore.setWebhook({
		label: '',
		value: ''
	});
}
</script>
