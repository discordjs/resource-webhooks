<template>
	<NuxtLayout name="main">
		<NuxtPage />
	</NuxtLayout>
	<snackbars />
</template>

<script setup lang="ts">
import { configure } from 'vee-validate';

configure({
	validateOnBlur: true,
	validateOnChange: true,
	validateOnInput: true,
	validateOnModelUpdate: true
});
</script>
