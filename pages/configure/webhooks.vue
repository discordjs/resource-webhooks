<template>
	<div class="w-full px-5 h-full">
		<label for="add-webhook-modal" class="btn btn-primary gap-2 my-5 w-full">
			<hero-icons-plus />
			Add new webhook
		</label>
		<div class="overflow-x-auto">
			<table class="table table-zebra w-full">
				<colgroup>
					<col class="w-[5%]" />
					<col class="w-[90%]" />
					<col class="w-[5%]" />
				</colgroup>
				<thead>
					<tr>
						<th class="text-left">Label</th>
						<th class="text-left">URL</th>
						<th class="text-left">Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr v-if="webhooks.length === 0">
						<td colspan="3" class="text-center">
							<span class="opacity-75">No webhooks stored, add your first with the button above.</span>
						</td>
					</tr>
					<tr v-for="webhook in webhooks" :key="webhook.value" class="hover">
						<td>{{ webhook.label }}</td>
						<td>
							<nuxt-link :to="webhook.value" target="_blank" class="link link-primary">{{ webhook.value }}</nuxt-link>
						</td>
						<td>
							<div class="btn-group gap-2">
								<div class="tooltip" data-tip="Update webhook">
									<label for="edit-webhook-modal" class="btn btn-sm btn-circle" @click="editableWebhookStore.setWebhook(webhook)">
										<hero-icons-pencil class="w-4 h-4" />
									</label>
								</div>
								<div class="tooltip" data-tip="Delete webhook">
									<button class="btn btn-sm btn-circle" @click="removeWebhookUrl(webhook.value)">
										<hero-icons-trash class="w-4 h-4" />
									</button>
								</div>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup lang="ts">
const webhooks = getAllStoredWebhookUrls();

const editableWebhookStore = useEditableWebhook();
</script>
