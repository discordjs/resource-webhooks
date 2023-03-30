<template>
	<nav class="navbar sticky top-0 z-20 bg-slate-50 dark:bg-base-100">
		<div class="navbar-start flex items-center">
			<div class="dropdown">
				<label tabindex="0" class="btn-ghost btn lg:hidden" @click="toggleOpenDropdown">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
					</svg>
				</label>
				<ul tabindex="0" v-if="openDropdown === true" class="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow">
					<li>
						<nuxt-link to="/" @click="toggleOpenDropdown">Home</nuxt-link>
					</li>
					<li>
						<nuxt-link to="/post" @click="toggleOpenDropdown">Post</nuxt-link>
					</li>
					<li>
						<nuxt-link to="/update" @click="toggleOpenDropdown">Update</nuxt-link>
					</li>
					<li>
						<nuxt-link to="/configure/webhooks" @click="toggleOpenDropdown">Configure Webhooks</nuxt-link>
					</li>
					<li>
						<nuxt-link to="/configure/roles" @click="toggleOpenDropdown">Configure Roles</nuxt-link>
					</li>
				</ul>
			</div>
			<nuxt-link to="/" class="btn-ghost btn flex items-center justify-start text-xl normal-case"
				><img src="/images/gem.svg" style="height: 24px" /><span class="ml-2">Sapphire</span></nuxt-link
			>
		</div>
		<div class="navbar-end hidden w-full lg:flex">
			<ul class="menu menu-horizontal px-1">
				<li>
					<nuxt-link class="btn-ghost btn mx-1 normal-case" to="/">Home</nuxt-link>
				</li>
				<li>
					<nuxt-link class="btn-ghost btn mx-1 normal-case" to="/post">Post</nuxt-link>
				</li>
				<li>
					<nuxt-link class="btn-ghost btn mx-1 normal-case" to="/update">Update</nuxt-link>
				</li>
				<li>
					<nuxt-link class="btn-ghost btn mx-1 normal-case" to="/configure/webhooks">Configure Webhooks</nuxt-link>
				</li>
				<li>
					<nuxt-link class="btn-ghost btn mx-1 normal-case" to="/configure/roles">Configure Roles</nuxt-link>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script setup lang="ts">
const openDropdown = useOpenDropdown();

function toggleOpenDropdown() {
	openDropdown.value = !openDropdown.value;
}
</script>
