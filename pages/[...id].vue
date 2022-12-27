<template>
	<section class="body-font">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full mt-5 px-5">
			<home-card href="/post" title="Post" description="Go here to create new Webhook posts" btnText="Create Post" />
			<home-card href="/update" title="Update" description="Go here to update existing Webhook posts" btnText="Update Post" />
			<home-card href="/configure/webhooks" title="Configure Webhooks" description="Go here to configure your stored webhooks" btnText="Configure Webhooks" />
			<home-card href="/configure/roles" title="Configure Roles" description="Go here to configure your stored roles" btnText="Configure Roles" />
		</div>
	</section>
</template>
