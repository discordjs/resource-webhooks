<template>
	<div class="form-control mb-4 w-full">
		<label class="label">
			<span class="label-text"
				>{{ label }}
				<span v-if="options.length === 0">
					<span class="font-bold text-error">
						<nuxt-link class="link-secondary link" :to="addNewOptionHref">configuration page</nuxt-link>
					</span>
				</span>
			</span>
		</label>
		<Field :name="name" v-slot="{ value, errorMessage }" as="select" class="max-x-ws select w-full" :disabled="options.length === 0">
			<option value="">None</option>
			<option v-for="option in options" :key="option.value" :value="option" :selected="value && value.value === option.value">
				{{ option.label + ' - ' + option.value }}
			</option>

			<forms-error-message :name="name" :errorMessage="!!errorMessage" />
		</Field>
	</div>
</template>

<script setup lang="ts">
import { Field } from 'vee-validate';
import type { PersistedStorageEntry } from '~~/lib/types/PersistedStorageEntry';

const props = defineProps<{
	name: string;
	label: string;
	optionsStringReplacer: string;
	addNewOptionHref: string;
	options: PersistedStorageEntry[];
}>();
const parsedNoOptionString = 'No {{options}} are saved, selection is disabled. Save new {{options}} through the'.replaceAll(
	'{{options}}',
	props.optionsStringReplacer
);
</script>
