import { InputAdornment, type InputAdornmentProps as MInputAdornmentProps } from '@mui/material';
import type { FieldPathValue, FieldValues, Path } from 'react-hook-form';

import FormTextField, { type FormTextFieldProps } from './FormTextField';

interface FormNumberTextFieldProps<TFieldValues extends FieldValues = FieldValues, TName extends Path<TFieldValues> = Path<TFieldValues>>
	extends FormTextFieldProps<TFieldValues, TName> {
	/** The minimum allowed number */
	minimum: number;
	/** The maximum allowed number */
	maximum: number;
	/** The text to show in the {@link InputAdornment} at the end of the field */
	endAdornmentLabel: string;
	/** Additional properties to pass to the {@link InputAdornment} component from material-ui */
	InputAdornmentProps?: Omit<MInputAdornmentProps, 'position'>;
}

const FormNumberTextField = <TFieldValues extends FieldValues = FieldValues, TName extends Path<TFieldValues> = Path<TFieldValues>>({
	minimum,
	maximum,
	endAdornmentLabel,
	defaultValue = '' as unknown as FieldPathValue<TFieldValues, TName>,
	InputAdornmentProps,
	...FormTextFieldProps
}: FormNumberTextFieldProps<TFieldValues, TName>) => (
	<FormTextField<TFieldValues, TName>
		{...FormTextFieldProps}
		defaultValue={defaultValue}
		TextFieldProps={{
			...FormTextFieldProps.TextFieldProps,
			type: 'number',
			inputProps: {
				min: minimum,
				max: maximum,
				...FormTextFieldProps.TextFieldProps?.inputProps
			},
			InputProps: {
				endAdornment: (
					<InputAdornment {...InputAdornmentProps} position="end">
						{endAdornmentLabel}
					</InputAdornment>
				),
				...FormTextFieldProps.TextFieldProps?.InputProps
			}
		}}
	/>
);

export default FormNumberTextField;
