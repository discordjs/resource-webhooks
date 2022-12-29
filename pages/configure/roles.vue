<template>
	<div class="container mx-auto px-5 h-full">
		<modals-role :roles="roles" :role="null" action="add" @close-modal="openModal = null" v-if="openModal === ''" />
		<button class="btn btn-primary gap-2 my-5 w-full" @click="openModal = ''">
			<hero-icons-plus />
			Add new role
		</button>
		<div class="overflow-x-auto">
			<table class="table table-zebra md:w-full">
				<thead>
					<tr>
						<th>Role name</th>
						<th>Snowflake</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr v-if="roles.length === 0">
						<td colspan="3" class="text-center">
							<span class="opacity-75">No roles stored, add your first with the button above.</span>
						</td>
					</tr>
					<tr v-for="role in roles" :key="role.value" class="hover">
						<td>{{ role.label }}</td>
						<td>
							{{ role.value }}
						</td>
						<td>
							<label content="Update role" v-tippy class="btn btn-primary btn-circle btn-sm mr-3" @click="openModal = role.value">
								<hero-icons-pencil class="w-4 h-4" />
							</label>
							<button
								content="Delete role"
								v-tippy
								class="btn btn-accent btn-circle btn-sm"
								@click="roles = roles.filter((w) => w.value !== role.value)"
							>
								<hero-icons-trash class="w-4 h-4" />
							</button>
						</td>
						<modals-role
							:roles="roles"
							:role="role"
							action="edit"
							@close-modal="openModal = null"
							v-if="openModal === role.value"
						/>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup lang="ts">
const openModal = useOpenModal();
const roles = useRoles();
</script>
