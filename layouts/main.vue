<template>
	<div class="flex flex-col h-screen justify-between">
		<sections-app-navbar />
		<main class="flex-auto grid">
			<slot></slot>
		</main>
		<sections-app-footer />
	</div>
</template>
