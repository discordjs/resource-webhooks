import { LocalStorageEntry } from '~~/lib/utils/localStorage';

export function getAllStoredRoles(): LocalStorageEntry[] {
	return loadState(LocalStorageKeys.Roles);
}

export function removeRole(id: string): void {
	const roles = getAllStoredRoles();
	const newRoles = roles.filter((role) => role.value !== id);
	return saveState(LocalStorageKeys.Roles, newRoles);
}

export function addRole(role: LocalStorageEntry): void {
	const roles = getAllStoredRoles();
	const newRoles = [...roles, role];
	return saveState(LocalStorageKeys.Roles, newRoles);
}
