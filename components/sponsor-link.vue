<template>
	<nuxt-link :to="href" target="_blank">
		<slot></slot>
	</nuxt-link>
</template>

<script setup lang="ts">
defineProps<{ href: string }>();
</script>
