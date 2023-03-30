<template>
	<div class="container mx-auto h-full px-5">
		<modals-role :roles="rolesStorage.roles" :role="null" action="add" @close-modal="openModal = null" v-if="openModal === ''" />
		<button class="btn-shadow btn-primary btn my-5 w-full gap-2" @click="openModal = ''">
			<hero-icons-plus class="h-6 w-6" />
			Add new role
		</button>
		<div class="overflow-x-auto shadow-md">
			<table class="table-zebra table w-full">
				<thead>
					<tr>
						<th>Actions</th>
						<th>Role name</th>
					</tr>
				</thead>
				<tbody>
					<tr v-if="rolesStorage.roles.length === 0">
						<td colspan="3" class="text-center">
							<span class="opacity-75">No roles stored, add your first with the button above.</span>
						</td>
					</tr>
					<tr v-for="role in rolesStorage.roles" :key="role.value" class="hover">
						<td>
							<div class="tooltip-custom" data-tip="Update role">
								<button class="btn-primary btn-sm btn-circle btn mr-3" @click="openModal = role.value">
									<hero-icons-pencil class="h-4 w-4" />
								</button>
							</div>
							<div class="tooltip-custom" data-tip="Delete role">
								<button class="btn-secondary btn-sm btn-circle btn" @click="rolesStorage.removeRole(role.value)">
									<hero-icons-trash class="h-4 w-4" />
								</button>
							</div>
						</td>
						<td>
							<span class="tooltip tooltip-info" :data-tip="role.value">{{ role.label }}</span>
						</td>
						<modals-role
							:roles="rolesStorage.roles"
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
const rolesStorage = useRoles();
</script>
