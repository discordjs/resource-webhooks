<template>
	<div class="form-control w-full">
		<label class="label">
			<span class="label-text">{{ label }}</span>
		</label>
		<Field :name="name" v-slot="{ field, errorMessage }">
			<input v-bind="field" type="text" class="input-bordered input w-full" :class="{ 'input-error': !!errorMessage }" />
			<label class="label">
				<forms-error-message :name="name" :errorMessage="!!errorMessage" />
			</label>
		</Field>
	</div>
</template>

<script setup lang="ts">
import { Field } from 'vee-validate';

defineProps<{ name: string; label: string }>();
</script>
