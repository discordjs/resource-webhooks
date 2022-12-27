import type { ChangeEvent } from 'react';
import type { FieldPathValue, FieldValues, Path } from 'react-hook-form';
import type { ControllerProps as RHControllerProps } from 'react-hook-form/dist/types/controller';

export type TextFieldPropsOmittable = 'label' | 'error' | 'helperText' | 'onChange' | 'onBlur' | 'value' | 'defaultValue';
export type DatePickerOmittable = 'renderInput' | 'inputFormat' | 'mask' | 'desktopModeMediaQuery' | 'name' | 'onChange' | 'onBlur' | 'ref' | 'value';
export type ReactHookControllerOmittable = 'name' | 'control' | 'render';
export type StringOrUndefinedOrNull = string | undefined | null;
export type FormChangeSideEffect = (event: ChangeEvent<HTMLInputElement>) => void;

export interface CommonFormFieldProps<TFieldValues extends FieldValues = FieldValues, TName extends Path<TFieldValues> = Path<TFieldValues>> {
	/** The name of the field */
	name: Path<TFieldValues>;
	/** The default value for this field */
	defaultValue?: FieldPathValue<TFieldValues, TName>;
	/** Additional properties to pass to the {@link Controller} components from react-hook-form */
	ControllerProps?: Omit<RHControllerProps, ReactHookControllerOmittable>;
}

export interface CommonFormFieldPropsWithLabel<TFieldValues extends FieldValues = FieldValues, TName extends Path<TFieldValues> = Path<TFieldValues>>
	extends CommonFormFieldProps<TFieldValues, TName> {
	/** The label */
	label: string;
}
