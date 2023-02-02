<template>
	<div class="modal">
		<div class="modal-box relative">
			<Form
				@submit="onSubmit"
				@invalid-submit="onInvalidSubmit"
				:validation-schema="addOrEditRoleSchema(action === 'edit')"
				:initial-values="{ value: role?.value ?? '', label: role?.label ?? '' }"
				v-slot="{ resetForm, isSubmitting, meta }"
			>
				<button class="btn btn-sm btn-circle absolute right-2 top-2" @click="handleClose(resetForm)"><hero-icons-x /></button>
				<h3 class="text-lg font-bold">{{ action === 'add' ? 'Add a new role snowflake' : 'Update role snowflake' }}</h3>
				<forms-input name="label" label="Role name" />
				<forms-input name="value" label="Role Snowflake" />
				<div class="mt-5 grid w-full grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4">
					<button type="button" class="btn btn-accent" @click="resetForm()">Reset form</button>
					<button type="submit" class="btn btn-primary" :disabled="isSubmitting || !meta.valid">
						{{ action === 'add' ? 'Add role snowflake' : 'Update role snowflake' }}
					</button>
				</div>
			</Form>
		</div>
	</div>
</template>

<script setup lang="ts">
import { cast } from '@sapphire/utilities';
import { Form, type InvalidSubmissionContext } from 'vee-validate';
import { addOrEditRoleSchema } from '~~/lib/schemas/addOrEditRoleSchema';
import type { LocalStorageEntry } from '~~/lib/utils/localStorage';

const emit = defineEmits(['close-modal']);
const props = defineProps<{ roles: LocalStorageEntry[]; role: LocalStorageEntry | null; action: 'add' | 'edit' }>();

const onInvalidSubmit = ({ errors }: InvalidSubmissionContext) => useInvalidFormSubmit(errors);

function handleClose(resetForm?: () => void) {
	resetForm?.();
	emit('close-modal');
}

function onSubmit(values: Record<string, unknown>) {
	if (props.action === 'add') {
		props.roles.push(cast<LocalStorageEntry>(values));
	} else {
		const index = props.roles.findIndex((role) => role.value === props.role?.value);
		props.roles.splice(index, 1, cast<LocalStorageEntry>(values));
	}
	handleClose();
}
</script>
