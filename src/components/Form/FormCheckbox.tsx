import {
	Checkbox,
	FormControlLabel,
	type CheckboxProps as MCheckboxProps,
	type FormControlLabelProps as MFormControlLabelProps
} from '@mui/material';
import { Controller, useFormContext, type FieldValues, type Path } from 'react-hook-form';

import type { CommonFormFieldPropsWithLabel } from './types';

interface FormCheckboxProps<TFieldValues extends FieldValues = FieldValues, TName extends Path<TFieldValues> = Path<TFieldValues>>
	extends CommonFormFieldPropsWithLabel<TFieldValues, TName> {
	/** Additional properties to pass to the {@link Checkbox} component from material-ui */
	CheckboxProps?: MCheckboxProps;
	/** Additional properties to pass to the {@link FormControlLabel} component from material-ui */
	FormControlLabelProps?: MFormControlLabelProps;
}

const FormCheckbox = <TFieldValues extends FieldValues = FieldValues, TName extends Path<TFieldValues> = Path<TFieldValues>>({
	name,
	label,
	defaultValue,
	ControllerProps,
	CheckboxProps,
	FormControlLabelProps
}: FormCheckboxProps<TFieldValues, TName>) => {
	const { control } = useFormContext();

	return (
		<Controller
			{...ControllerProps}
			name={name}
			control={control}
			defaultValue={defaultValue}
			render={({ field: { value, ...fieldProps } }) => {
				return (
					<FormControlLabel
						{...FormControlLabelProps}
						{...fieldProps}
						label={label}
						control={<Checkbox {...fieldProps} {...CheckboxProps} checked={value} />}
					/>
				);
			}}
		/>
	);
};

export default FormCheckbox;
