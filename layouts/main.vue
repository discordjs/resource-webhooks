<template>
	<sections-app-navbar />
	<section class="grid grid-layout-container overflow-auto h-[calc(100vh_-_64px)]">
		<main>
			<slot></slot>
		</main>
		<sections-app-footer />
	</section>
</template>
