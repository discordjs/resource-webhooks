import { FormControlLabel, Switch, type FormControlLabelProps as MFormControlLabelProps, type SwitchProps as MSwitchProps } from '@mui/material';
import type { ChangeEvent } from 'react';

import { Controller, useFormContext, type FieldValues, type Path } from 'react-hook-form';

import type { CommonFormFieldPropsWithLabel } from './types';

interface FormSwitchProps<TFieldValues extends FieldValues = FieldValues, TName extends Path<TFieldValues> = Path<TFieldValues>>
	extends CommonFormFieldPropsWithLabel<TFieldValues, TName> {
	/** Optional side effect that should trigger when changing the state of the {@link Switch} */
	onChangeSideEffect?(event: ChangeEvent<HTMLInputElement>): void;
	/** Additional properties to pass to the {@link FormControlLabel} component from material-ui */
	FormControlLabelProps?: Omit<MFormControlLabelProps, 'control' | 'label'>;
	/** Additional properties to pass to the {@link Switch} component from material-ui */
	SwitchProps?: MSwitchProps;
}

const FormSwitch = <TFieldValues extends FieldValues = FieldValues, TName extends Path<TFieldValues> = Path<TFieldValues>>({
	name,
	label,
	defaultValue,
	onChangeSideEffect,
	ControllerProps,
	FormControlLabelProps,
	SwitchProps
}: FormSwitchProps<TFieldValues, TName>) => {
	const { control } = useFormContext();

	return (
		<Controller
			{...ControllerProps}
			name={name}
			control={control}
			defaultValue={defaultValue}
			render={({ field: { onChange, ...field } }) => {
				const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
					onChange(event);
					onChangeSideEffect?.(event);
				};
				return (
					<FormControlLabel
						{...FormControlLabelProps}
						control={<Switch {...SwitchProps} {...field} onChange={handleChange} checked={field.value} />}
						label={label}
					/>
				);
			}}
		/>
	);
};

export default FormSwitch;
