import type { PersistedStorageEntry } from '~~/lib/types/PersistedStorageEntry';

interface RolesState {
	roles: PersistedStorageEntry[];
}

export const useRoles = defineStore('roles', {
	state: (): RolesState => ({
		roles: [] as PersistedStorageEntry[]
	}),

	persist: {
		storage: persistedState.cookiesWithOptions({
			sameSite: 'strict'
		})
	},

	actions: {
		addRole(role: PersistedStorageEntry) {
			if (!this.hasRole(role.value)) {
				this.roles.push(role);
			}
		},

		removeRole(url: string) {
			this.roles = this.roles.filter((role) => url !== role.value);
		},

		hasRole(url: string) {
			return this.roles.some((role) => role.value === url);
		}
	}
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useRoles, import.meta.hot));
}
