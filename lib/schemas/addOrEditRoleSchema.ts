import { object, string } from 'yup';
import { SnowflakeRegex } from '~~/lib/utils/DiscordRegexes';

export const addOrEditRoleSchema = (isUpdating: boolean) => {
	const rolesStorage = useRoles();

	return object({
		value: string()
			.required('The role snowflake is required.')
			.matches(SnowflakeRegex, 'The role snowflake is invalid.')
			.test(
				'role-snowflake-is-unique',
				'The role snowflake is already in use, please enter another one.',
				(value) => isUpdating || !rolesStorage.hasRole(value)
			),
		label: string()
			.required('The role label is required.')
			.min(3, 'The role label should at least be 3 characters long.')
			.max(50, 'The role label can at most be 50 characters long.')
	});
};
