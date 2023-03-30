<template>
	<div v-if="isLoadingIndicator" role="presentation" class="fixed z-[1200] block h-full w-full bg-slate-200 opacity-75 dark:bg-zinc-950">
		<div class="absolute left-1/2 top-1/2 z-[1200]">
			<div
				class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
				role="status"
			>
				<span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const isLoadingIndicator = useLoadingIndicator();
</script>
