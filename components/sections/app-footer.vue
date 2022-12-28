<template>
	<footer>
		<div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
			<div class="flex flex-wrap flex-row justify-center content-start items-center w-full">
				<p class="text-sm text-center max-w-full flex-grow-0 basis-full opacity-70 mb-2 mt-4">
					Copyright © 2022 The Sapphire Community and its contributors
				</p>

				<sponsor-link href="https://vercel.com/?utm_source=sapphiredev&utm_campaign=oss" class="mr-2">
					<nuxt-img src="/images/powered-by-vercel.svg" style="height: 40px" />
				</sponsor-link>

				<sponsor-link href="https://polypane.app/">
					<nuxt-img src="/images/powered-by-polypane.svg" style="height: 40px" />
				</sponsor-link>
			</div>
		</div>
	</footer>
</template>
