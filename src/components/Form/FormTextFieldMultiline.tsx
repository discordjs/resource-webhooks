import { TextField, type TextFieldProps as MTextFieldProps } from '@mui/material';
import getProperty from 'lodash.get';
import { Controller, useFormContext, type FieldValues, type Path } from 'react-hook-form';

import type { CommonFormFieldPropsWithLabel, StringOrUndefinedOrNull, TextFieldPropsOmittable } from './types';

interface FormTextFieldMultilineProps<TFieldValues extends FieldValues = FieldValues, TName extends Path<TFieldValues> = Path<TFieldValues>>
	extends CommonFormFieldPropsWithLabel<TFieldValues, TName> {
	/**
	 * Minimum amount of rows to display
	 * This will transform the field to an auto-sizing one.
	 * Recommended to also set {@link FormTextFieldMultilineProps.maxRows}
	 * @default 2
	 */
	minRows?: number;
	/** The maximum amount of rows before the auto-sizing component should start scrolling */
	maxRows?: number;
	/** Additional properties to pass to the {@link TextField} component from material-ui */
	TextFieldProps?: Omit<MTextFieldProps, TextFieldPropsOmittable>;
}

const FormTextFieldMultiline = <TFieldValues extends FieldValues = FieldValues, TName extends Path<TFieldValues> = Path<TFieldValues>>({
	label,
	name,
	defaultValue,
	minRows,
	maxRows,
	TextFieldProps,
	ControllerProps
}: FormTextFieldMultilineProps<TFieldValues, TName>) => {
	const {
		control,
		formState: { errors }
	} = useFormContext<TFieldValues>();

	return (
		<Controller
			{...ControllerProps}
			name={name}
			control={control}
			defaultValue={defaultValue}
			render={({ field }) => (
				<TextField
					fullWidth={true}
					variant="standard"
					{...TextFieldProps}
					{...field}
					label={label}
					multiline={true}
					minRows={minRows ?? TextFieldProps?.minRows ?? 2}
					maxRows={maxRows ?? TextFieldProps?.maxRows ?? undefined}
					error={Boolean(getProperty(errors, name))}
					helperText={(getProperty(errors, name)?.message as StringOrUndefinedOrNull) ?? ''}
				/>
			)}
		/>
	);
};

export default FormTextFieldMultiline;
