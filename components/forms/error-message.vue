<template>
	<ErrorMessage :name="name" class="label-text-alt" :class="{ 'text-red-500': !!errorMessage }" />
</template>

<script setup lang="ts">
import { ErrorMessage } from 'vee-validate';

defineProps<{ name: string; errorMessage: boolean }>();
</script>
