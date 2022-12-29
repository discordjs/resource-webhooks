<template>
	<div class="modal">
		<div class="modal-box relative">
			<Form
				@submit="onSubmit"
				@invalid-submit="onInvalidSubmit"
				:validation-schema="addOrEditNewWebhookSchema"
				:initial-values="{ value: webhook?.value ?? '', label: webhook?.label ?? '' }"
				v-slot="{ resetForm, isSubmitting, meta }"
			>
				<button class="btn btn-sm btn-circle absolute right-2 top-2" @click="handleClose(resetForm)"><hero-icons-x /></button>
				<h3 class="text-lg font-bold">{{ action === 'add' ? 'Add a new Webhook URL' : 'Update Webhook URL' }}</h3>
				<forms-input name="label" label="Label" />
				<forms-input name="value" label="Webhook URL" />
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4 w-full mt-5">
					<button type="button" class="btn btn-accent" @click="resetForm()">Reset form</button>
					<button type="submit" class="btn btn-primary" :disabled="isSubmitting || !meta.valid">Add Webhook URL</button>
				</div>
			</Form>
		</div>
	</div>
</template>

<script setup lang="ts">
import { cast } from '@sapphire/utilities';
import { Form, type InvalidSubmissionContext } from 'vee-validate';
import { addOrEditNewWebhookSchema } from '~~/lib/schemas/addOrEditNewWebhookSchema';
import type { LocalStorageEntry } from '~~/lib/utils/localStorage';

const emit = defineEmits(['close-modal']);
const props = defineProps<{ webhooks: LocalStorageEntry[]; webhook: LocalStorageEntry | null; action: 'add' | 'edit' }>();

const onInvalidSubmit = ({ errors }: InvalidSubmissionContext) => useInvalidFormSubmit(errors);

function handleClose(resetForm?: () => void) {
	resetForm?.();
	emit('close-modal');
}

function onSubmit(values: Record<string, unknown>) {
	props.webhooks.push(cast<LocalStorageEntry>(values));
	handleClose();
}
</script>
