<template>
	<div class="card w-full bg-base-100 shadow-xl px-2">
		<div class="card-body">
			<h2 class="card-title">{{ title }}</h2>
			<p>{{ description }}</p>
			<div class="card-actions justify-end">
				<nuxt-link :to="href">
					<button class="btn btn-primary normal-case min-w-[10rem]">{{ btnText }}</button>
				</nuxt-link>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps<{ title: string; description: string; btnText: string; href: string }>();
</script>
