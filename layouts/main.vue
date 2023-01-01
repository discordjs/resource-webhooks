<template>
	<div class="h-full pb-20" @click="closeDropdownIfOpen">
		<div class="min-h-full grid grid-layout">
			<sections-app-navbar />
			<section class="grid grid-layout-container overflow-auto pb-20 lg:pb-0 h-[calc(100vh_-_64px)]">
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
