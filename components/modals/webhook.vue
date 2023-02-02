<template>
	<div class="modal">
		<div class="modal-box relative">
			<Form
				@submit="onSubmit"
				@invalid-submit="onInvalidSubmit"
				:validation-schema="addOrEditWebhookSchema(action === 'edit')"
				:initial-values="{ value: webhook?.value ?? '', label: webhook?.label ?? '' }"
				v-slot="{ resetForm, isSubmitting, meta }"
			>
				<button class="btn btn-sm btn-circle absolute right-2 top-2" @click="handleClose(resetForm)"><hero-icons-x /></button>
				<h3 class="text-lg font-bold">{{ action === 'add' ? 'Add a new Webhook URL' : 'Update Webhook URL' }}</h3>
				<forms-input name="label" label="Label" />
				<forms-input name="value" label="Webhook URL" />
				<div class="mt-5 grid w-full grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4">
					<button type="button" class="btn btn-accent" @click="resetForm()">Reset form</button>
					<button type="submit" class="btn btn-primary" :disabled="isSubmitting || !meta.valid">
						{{ action === 'add' ? 'Add Webhook URL' : 'Update Webhook URL' }}
					</button>
				</div>
			</Form>
		</div>
	</div>
</template>

<script setup lang="ts">
import { cast } from '@sapphire/utilities';
import { Form, type InvalidSubmissionContext } from 'vee-validate';
import { addOrEditWebhookSchema } from '~~/lib/schemas/addOrEditWebhookSchema';
import type { LocalStorageEntry } from '~~/lib/utils/localStorage';

const emit = defineEmits(['close-modal']);
const props = defineProps<{ webhooks: LocalStorageEntry[]; webhook: LocalStorageEntry | null; action: 'add' | 'edit' }>();

const onInvalidSubmit = ({ errors }: InvalidSubmissionContext) => useInvalidFormSubmit(errors);

function handleClose(resetForm?: () => void) {
	resetForm?.();
	emit('close-modal');
}

function onSubmit(values: Record<string, unknown>) {
	if (props.action === 'add') {
		props.webhooks.push(cast<LocalStorageEntry>(values));
	} else {
		const index = props.webhooks.findIndex((webhook) => webhook.value === props.webhook?.value);
		props.webhooks.splice(index, 1, cast<LocalStorageEntry>(values));
	}

	handleClose();
}
</script>
