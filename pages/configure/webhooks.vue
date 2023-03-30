<template>
	<div class="container mx-auto h-full px-5">
		<modals-webhook :webhooks="webhookStorage.webhooks" :webhook="null" action="add" @close-modal="openModal = null" v-if="openModal === ''" />
		<button class="btn-shadow btn-primary btn my-5 w-full gap-2" @click="openModal = ''">
			<hero-icons-plus class="h-6 w-6" />
			Add new webhook
		</button>
		<div class="overflow-x-auto shadow-md">
			<table class="table-zebra table w-full">
				<thead>
					<tr>
						<th>Actions</th>
						<th>Name</th>
					</tr>
				</thead>
				<tbody>
					<tr v-if="webhookStorage.webhooks.length === 0">
						<td colspan="3" class="text-center">
							<span class="opacity-75">No webhooks stored, add your first with the button above.</span>
						</td>
					</tr>
					<tr v-for="webhook in webhookStorage.webhooks" :key="webhook.value" class="hover">
						<td>
							<div class="tooltip-custom" data-tip="Update webhook">
								<button class="btn-primary btn-sm btn-circle btn mr-3" @click="openModal = webhook.value">
									<hero-icons-pencil class="h-4 w-4" />
								</button>
							</div>
							<div class="tooltip-custom" data-tip="Delete webhook">
								<button class="btn-secondary btn-sm btn-circle btn" @click="webhookStorage.removeWebhook(webhook.value)">
									<hero-icons-trash class="h-4 w-4" />
								</button>
							</div>
						</td>
						<td>
							<nuxt-link
								:to="webhook.value"
								target="_blank"
								class="link tooltip tooltip-info"
								data-tip="Use 'Copy Link Address' to copy the webhook URL"
							>
								{{ webhook.label }}
							</nuxt-link>
						</td>
						<modals-webhook
							:webhooks="webhookStorage.webhooks"
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
const webhookStorage = useWebhooks();
</script>
