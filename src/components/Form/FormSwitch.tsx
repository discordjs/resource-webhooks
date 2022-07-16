import { FormControlLabel, Switch, type SwitchProps as MSwitchProps } from '@mui/material';

import { Controller, useFormContext, type FieldValues, type Path } from 'react-hook-form';

import type { CommonFormFieldPropsWithLabel } from './types';

interface FormSwitchProps<TFieldValues extends FieldValues = FieldValues, TName extends Path<TFieldValues> = Path<TFieldValues>>
	extends CommonFormFieldPropsWithLabel<TFieldValues, TName> {
	/** Additional properties to pass to the {@link Switch} component from material-ui */
	SwitchProps?: MSwitchProps;
}

const FormSwitch = <TFieldValues extends FieldValues = FieldValues, TName extends Path<TFieldValues> = Path<TFieldValues>>({
	name,
	label,
	defaultValue,
	ControllerProps,
	SwitchProps
}: FormSwitchProps<TFieldValues, TName>) => {
	const { control } = useFormContext();

	return (
		<Controller
			{...ControllerProps}
			name={name}
			control={control}
			defaultValue={defaultValue}
			render={({ field }) => <FormControlLabel control={<Switch {...SwitchProps} {...field} checked={field.value} />} label={label} />}
		/>
	);
};

export default FormSwitch;
