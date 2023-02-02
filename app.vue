<template>
	<NuxtLayout name="main">
		<NuxtPage />
	</NuxtLayout>
	<snackbars />
</template>

<script setup lang="ts">
import { configure } from 'vee-validate';

watch(usePreferredColorScheme(), (value) => {
	document.documentElement.setAttribute('data-theme', value);
});

configure({
	validateOnBlur: true,
	validateOnChange: true,
	validateOnInput: true,
	validateOnModelUpdate: true
});
</script>
