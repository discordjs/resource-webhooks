<template>
	<div class="container mx-auto px-5 h-full">
		<modals-webhook :webhooks="webhooks" :webhook="null" action="add" @close-modal="openModal = null" v-if="openModal === ''" />
		<button class="btn btn-primary gap-2 my-5 w-full" @click="openModal = ''">
			<hero-icons-plus />
			Add new webhook
		</button>
		<div class="overflow-x-auto">
			<table class="table table-zebra w-full">
				<thead>
					<tr>
						<th>Actions</th>
						<th>Name</th>
					</tr>
				</thead>
				<tbody>
					<tr v-if="webhooks.length === 0">
						<td colspan="3" class="text-center">
							<span class="opacity-75">No webhooks stored, add your first with the button above.</span>
						</td>
					</tr>
					<tr v-for="webhook in webhooks" :key="webhook.value" class="hover">
						<td>
							<label content="Update webhook" v-tippy class="btn btn-primary btn-circle btn-sm mr-3" @click="openModal = webhook.value">
								<hero-icons-pencil class="w-4 h-4" />
							</label>
							<button
								content="Delete webhook"
								v-tippy
								class="btn btn-accent btn-circle btn-sm"
								@click="webhooks = webhooks.filter((w) => w.value !== webhook.value)"
							>
								<hero-icons-trash class="w-4 h-4" />
							</button>
						</td>
						<td>
							<nuxt-link :to="webhook.value" target="_blank" class="link">{{ webhook.label }}</nuxt-link>
						</td>
						<modals-webhook
							:webhooks="webhooks"
							:webhook="webhook"
							action="edit"
							@close-modal="openModal = null"
							v-if="openModal === webhook.value"
						/>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup lang="ts">
const openModal = useOpenModal();
const webhooks = useWebhooks();
</script>
