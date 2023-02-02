<template>
	<div class="mt-5 grid w-full grid-cols-1 gap-4 px-5 lg:grid-cols-2">
		<home-card href="/post" title="Post" description="Go here to create new Webhook posts" btnText="Create Post" />
		<home-card href="/update" title="Update" description="Go here to update existing Webhook posts" btnText="Update Post" />
		<home-card
			href="/configure/webhooks"
			title="Configure Webhooks"
			description="Go here to configure your stored webhooks"
			btnText="Configure Webhooks"
		/>
		<home-card href="/configure/roles" title="Configure Roles" description="Go here to configure your stored roles" btnText="Configure Roles" />
	</div>
</template>
