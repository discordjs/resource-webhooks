<template>
	<div class="form-control w-full">
		<label class="label">
			<span class="label-text">{{ label }}</span>
		</label>
		<Field :name="name" v-slot="{ value, errorMessage }" as="select" class="select w-full max-x-ws">
			<option value="">None</option>
			<option v-for="role in roles" :key="role.value" :value="role" :selected="value && value.value === role.value">
				{{ role.label + ' - ' + role.value }}
			</option>

			<forms-error-message :name="name" :errorMessage="!!errorMessage" />
		</Field>
	</div>
</template>

<script setup lang="ts">
import { Field } from 'vee-validate';
import type { LocalStorageEntry } from '~~/lib/utils/localStorage';

defineProps<{ name: string; label: string }>();

const roles: LocalStorageEntry[] = [
	{
		label: 'Ping me for announcements',
		value: '912088476290273300'
	},
	{
		label: 'Dragonite does repo maintenance',
		value: '901237389257744426'
	}
];
</script>
