<template>
	<div class="h-full pb-20" @click="closeDropdownIfOpen">
		<nuxt-loading-indicator />
		<div class="grid-layout grid min-h-full">
			<sections-app-navbar />
			<section class="grid-layout-container grid h-[calc(100vh_-_64px)] overflow-auto pb-20 lg:pb-0">
				<main>
					<slot></slot>
				</main>
				<sections-app-footer />
			</section>
		</div>
	</div>
</template>

<script setup lang="ts">
const openDropdown = useOpenDropdown();
const prevValue = useState<boolean | null>('prev-value', () => null);

function closeDropdownIfOpen() {
	if ((prevValue === null && openDropdown.value) || (prevValue.value && openDropdown.value)) {
		openDropdown.value = false;
	}

	prevValue.value = openDropdown.value;
}
</script>
