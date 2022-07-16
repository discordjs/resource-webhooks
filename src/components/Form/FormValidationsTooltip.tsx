import { Box, Tooltip, useTheme } from '@mui/material';

import { filterNullish, isNullishOrEmpty, type AnyObject } from '@sapphire/utilities';
import type { ReactNode } from 'react';
import { get, useFormContext, type FieldErrors, type FieldValues } from 'react-hook-form';

interface FormValidationsTooltipProps<TFieldValues extends FieldValues = FieldValues> {
	errors?: FieldErrors<TFieldValues>;
	children: ReactNode;
}

const ChildrenOfTooltip = (children: ReactNode) => (
	// eslint-disable-next-line react/jsx-no-useless-fragment
	<>{children}</>
);

function getErrorMessages<TFieldValues extends FieldValues = FieldValues>(errors: FieldErrors<TFieldValues>, fieldNames: string[]) {
	const collectedErrorMessages: string[] = [];

	for (const fieldName of fieldNames) {
		const error = get(errors, fieldName);

		if (error) {
			collectedErrorMessages.push(error.message);
		}
	}

	return collectedErrorMessages.filter(filterNullish);
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
}: FormValidationsTooltipProps<TFieldValues>): JSX.Element => {
	const theme = useTheme();

	const { getValues, formState } = useFormContext<TFieldValues>();

	const formFieldNames = getDeepKeys(getValues());

	if (isNullishOrEmpty(formFieldNames)) {
		return ChildrenOfTooltip(children);
	}

	const errorMessages = getErrorMessages(errors || formState.errors, formFieldNames);

	if (isNullishOrEmpty(errorMessages)) {
		return ChildrenOfTooltip(children);
	}

	return (
		<Tooltip
			title={
				<Box sx={{ p: 1 }}>
					<ul style={{ paddingInlineStart: '10px' }}>
						{errorMessages.map((error, index) => (
							<li key={index} style={{ paddingBottom: '8px' }}>
								{error}
								<br />
							</li>
						))}
					</ul>
				</Box>
			}
			placement="top"
			enterDelay={300}
			sx={{
				backgroundColor: 'white',
				boxShadow: theme.shadows[5],
				color: 'black',
				fontSize: '0.8rem',
				transition: '.2s ease-out,-webkit-transform .2s ease-out',
				transform: 'translateZ(0)'
			}}
		>
			<Box>{children}</Box>
		</Tooltip>
	);
};

export default FormValidationsTooltip;
