import { Box, List, ListItem, ListItemText, Tooltip } from '@mui/material';

import { filterNullish, isNullishOrEmpty, type AnyObject } from '@sapphire/utilities';
import type { ReactElement } from 'react';
import { get, useFormContext, type FieldErrors, type FieldValues } from 'react-hook-form';

interface FormValidationsTooltipProps<TFieldValues extends FieldValues = FieldValues> {
	errors?: FieldErrors<TFieldValues>;
	children: ReactElement;
}

function getErrorMessages<TFieldValues extends FieldValues = FieldValues>(errors: FieldErrors<TFieldValues>, fieldNames: string[]) {
	const collectedErrorMessages: string[] = [];

	for (const fieldName of fieldNames) {
		const error = get(errors, fieldName);

		if (error) {
			collectedErrorMessages.push(error.message);
		}
	}

	return collectedErrorMessages.filter(filterNullish).sort();
}

function getDeepKeys<T>(obj: AnyObject<T>) {
	let keys: string[] = [];

	for (const key in obj) {
		if (typeof obj[key] === 'object') {
			const subKeys = getDeepKeys(obj[key]);
			keys = keys.concat(subKeys.map((subKey) => `${key}.${subKey}`));
		} else {
			keys.push(key);
		}
	}

	return keys;
}

const FormValidationsTooltip = <TFieldValues extends FieldValues = FieldValues>({
	children,
	errors
}: FormValidationsTooltipProps<TFieldValues>): ReactElement => {
	const { getValues, formState } = useFormContext<TFieldValues>();

	const formFieldNames = getDeepKeys(getValues());

	if (isNullishOrEmpty(formFieldNames)) {
		return children;
	}

	const errorMessages = getErrorMessages(errors || formState.errors, formFieldNames);

	if (isNullishOrEmpty(errorMessages)) {
		return children;
	}

	return (
		<Tooltip
			title={
				<List sx={{ paddingInlineStart: '10px' }} dense disablePadding>
					{errorMessages.map((error, index) => (
						<ListItem key={index} disableGutters>
							<ListItemText primary={error} primaryTypographyProps={{ variant: 'body1' }} />
						</ListItem>
					))}
				</List>
			}
		>
			<Box>{children}</Box>
		</Tooltip>
	);
};

export default FormValidationsTooltip;
