<template>
	<div class="flex flex-col h-screen justify-between">
		<sections-app-navbar />
		<main class="flex-auto grid">
			<section>
				<slot></slot>
			</section>
		</main>
		<sections-app-footer />
	</div>
</template>
