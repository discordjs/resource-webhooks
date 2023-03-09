<template>
	<div class="modal">
		<div class="modal-box relative">
			<form @submit="onSubmit">
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
			</form>
		</div>
	</div>
</template>

<script setup lang="ts">
import { cast } from '@sapphire/utilities';
import { useForm, type InvalidSubmissionHandler, type SubmissionHandler } from 'vee-validate';
import { addOrEditWebhookSchema } from '~~/lib/schemas/addOrEditWebhookSchema';
import type { LocalStorageEntry } from '~~/lib/utils/localStorage';

const emit = defineEmits(['close-modal']);
const props = defineProps<{ webhooks: LocalStorageEntry[]; webhook: LocalStorageEntry | null; action: 'add' | 'edit' }>();

const { handleSubmit, resetForm, isSubmitting, meta } = useForm<LocalStorageEntry>({
	initialValues: {
		value: props.webhook?.value ?? '',
		label: props.webhook?.label ?? ''
	},
	validationSchema: addOrEditWebhookSchema(props.action === 'edit')
});

function handleClose(resetForm?: () => void) {
	resetForm?.();
	emit('close-modal');
}

const onInvalidSubmit: InvalidSubmissionHandler<LocalStorageEntry> = ({ errors }) => useInvalidFormSubmit(errors);
const onSuccessfulSubmit: SubmissionHandler<LocalStorageEntry> = (values) => {
	if (props.action === 'add') {
		props.webhooks.push(cast<LocalStorageEntry>(values));
	} else {
		const index = props.webhooks.findIndex((webhook) => webhook.value === props.webhook?.value);
		props.webhooks.splice(index, 1, cast<LocalStorageEntry>(values));
	}

	handleClose();
};

const onSubmit = handleSubmit(onSuccessfulSubmit, onInvalidSubmit);
</script>
