import { TextField, type TextFieldProps as MTextFieldProps } from '@mui/material';
import getProperty from 'lodash.get';
import { Controller, useFormContext, type FieldValues, type Path } from 'react-hook-form';

import type { CommonFormFieldPropsWithLabel, StringOrUndefinedOrNull, TextFieldPropsOmittable } from './types';

export interface FormTextFieldProps<TFieldValues extends FieldValues = FieldValues, TName extends Path<TFieldValues> = Path<TFieldValues>>
	extends CommonFormFieldPropsWithLabel<TFieldValues, TName> {
	/** Additional properties to pass to the {@link TextField} component from material-ui */
	TextFieldProps?: Omit<MTextFieldProps, TextFieldPropsOmittable>;
}

const FormTextField = <TFieldValues extends FieldValues = FieldValues, TName extends Path<TFieldValues> = Path<TFieldValues>>({
	label,
	name,
	defaultValue,
	TextFieldProps,
	ControllerProps
}: FormTextFieldProps<TFieldValues, TName>) => {
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
					{...TextFieldProps}
					{...field}
					fullWidth
					label={label}
					error={Boolean(getProperty(errors, name))}
					helperText={(getProperty(errors, name)?.message as StringOrUndefinedOrNull) ?? ''}
					FormHelperTextProps={{
						sx: {
							m: 0
						}
					}}
				/>
			)}
		/>
	);
};

export default FormTextField;
