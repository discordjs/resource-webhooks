<template>
	<div class="form-control mb-4 w-full">
		<label class="label">
			<span class="label-text"
				>{{ label
				}}<span v-if="options.length === 0"
					>.
					<span class="text-error font-bold"
						>{{ parsedNoOptionString }} <nuxt-link class="link link-secondary" :to="addNewOptionHref">configuration page</nuxt-link></span
					>
				</span></span
			>
		</label>
		<Field :name="name" v-slot="{ value, errorMessage }" as="select" class="select max-x-ws w-full" :disabled="options.length === 0">
			<option value="">None</option>
			<option v-for="role in options" :key="role.value" :value="JSON.stringify(role)" :selected="value && value.value === role.value">
				{{ role.label + ' - ' + role.value }}
			</option>

			<forms-error-message :name="name" :errorMessage="!!errorMessage" />
		</Field>
	</div>
</template>

<script setup lang="ts">
import { Field } from 'vee-validate';
import type { LocalStorageEntry } from '~~/lib/utils/localStorage';

const props = defineProps<{
	name: string;
	label: string;
	optionsStringReplacer: string;
	addNewOptionHref: string;
	options: LocalStorageEntry[];
}>();
const parsedNoOptionString = 'No {{options}} are saved, selection is disabled. Save new {{options}} through the'.replaceAll(
	'{{options}}',
	props.optionsStringReplacer
);
</script>
