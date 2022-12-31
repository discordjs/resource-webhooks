<template>
	<nav class="navbar bg-base-100 sticky top-0 z-20">
		<div class="navbar-start flex items-center">
			<div class="dropdown">
				<label tabindex="0" class="btn btn-ghost lg:hidden" @click="toggleOpenDropdown">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
					</svg>
				</label>
				<ul tabindex="0" v-if="openDropdown === true" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
					<li v-if="$route.path !== '/'">
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
			<nuxt-link to="/" class="btn btn-ghost normal-case text-xl flex justify-start items-center"
				><nuxt-img src="/images/gem.svg" style="height: 24px" /><span class="ml-2">Sapphire</span></nuxt-link
			>
		</div>
		<div class="navbar-end w-full hidden lg:flex">
			<ul class="menu menu-horizontal px-1">
				<li v-if="$route.path !== '/'">
					<nuxt-link class="btn btn-ghost normal-case mx-1" to="/">Home</nuxt-link>
				</li>
				<li>
					<nuxt-link class="btn btn-ghost normal-case mx-1" to="/post">Post</nuxt-link>
				</li>
				<li>
					<nuxt-link class="btn btn-ghost normal-case mx-1" to="/update">Update</nuxt-link>
				</li>
				<li>
					<nuxt-link class="btn btn-ghost normal-case mx-1" to="/configure/webhooks">Configure Webhooks</nuxt-link>
				</li>
				<li>
					<nuxt-link class="btn btn-ghost normal-case mx-1" to="/configure/roles">Configure Roles</nuxt-link>
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
