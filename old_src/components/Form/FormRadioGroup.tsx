import {
	FormControlLabel,
	Radio,
	RadioGroup,
	type FormControlLabelProps as MFormControlLabelProps,
	type RadioGroupProps as MRadioGroupProps
} from '@mui/material';
import { Controller, useFormContext, type FieldPathValue, type FieldValues, type Path } from 'react-hook-form';

import type { CommonFormFieldProps } from './types';

interface FormRadioGroupProps<TFieldValues extends FieldValues = FieldValues, TName extends Path<TFieldValues> = Path<TFieldValues>>
	extends CommonFormFieldProps<TFieldValues, TName> {
	/** The label for the "on" state radio button */
	onStateLabel: string;
	/** The label for the "off" state radio button */
	offStateLabel: string;
	/** The value for the radio button when it should be considered "off" */
	onStateValue: FieldPathValue<TFieldValues, TName>;
	/** The value for the radio button when it should be considered "on" */
	offStateValue: FieldPathValue<TFieldValues, TName>;
	/** The default value for this field */
	defaultValue: FieldPathValue<TFieldValues, TName>;
	/** Additional properties to pass to the {@link RadioGroup} component from material-ui */
	RadioGroupProps?: MRadioGroupProps;
	/** Additional properties to pass to the "off" state {@link FormControlLabel} component from material-ui */
	OffStateFormControlLabelProps?: MFormControlLabelProps;
	/** Additional properties to pass to the "on state" {@link FormControlLabel} component from material-ui */
	OnStateFormControlLabelProps?: MFormControlLabelProps;
}

const FormRadioGroup = <TFieldValues extends FieldValues = FieldValues, TName extends Path<TFieldValues> = Path<TFieldValues>>({
	name,
	onStateLabel,
	offStateLabel,
	onStateValue,
	offStateValue,
	defaultValue,
	ControllerProps,
	RadioGroupProps,
	OffStateFormControlLabelProps,
	OnStateFormControlLabelProps
}: FormRadioGroupProps<TFieldValues, TName>) => {
	const { control } = useFormContext();

	return (
		<Controller
			{...ControllerProps}
			name={name}
			control={control}
			defaultValue={defaultValue}
			render={({ field: { name: fieldName, value, ...radioProps } }) => (
				<RadioGroup row={true} {...RadioGroupProps} defaultValue={defaultValue} name={fieldName}>
					<FormControlLabel
						{...OffStateFormControlLabelProps}
						control={<Radio {...radioProps} value={offStateValue} color="primary" checked={value === offStateValue} />}
						label={offStateLabel}
					/>
					<FormControlLabel
						{...OnStateFormControlLabelProps}
						control={<Radio {...radioProps} value={onStateValue} color="primary" checked={value === onStateValue} />}
						label={onStateLabel}
					/>
				</RadioGroup>
			)}
		/>
	);
};

export default FormRadioGroup;
