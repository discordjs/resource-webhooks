import {
	Autocomplete,
	Grid,
	ListItem,
	TextField,
	Typography,
	type AutocompleteProps as MAutocompleteProps,
	type TextFieldProps as MTextFieldProps
} from '@mui/material';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { useRef, type HTMLAttributes } from 'react';
import { Controller, useFormContext, type FieldValues, type Path } from 'react-hook-form';

import type { CommonFormFieldPropsWithLabel, StringOrUndefinedOrNull } from './types';

export interface AutocompleteOption {
	label: string;
	value: string;
}

interface FormAutoCompleteProps<
	TFieldValues extends FieldValues = FieldValues,
	TObject extends AutocompleteOption = AutocompleteOption,
	TName extends Path<TFieldValues> = Path<TFieldValues>
> extends CommonFormFieldPropsWithLabel<TFieldValues, TName> {
	/** The items that should be rendered as menu items */
	options: TObject[];
	/**
	 * Whether to call the blur method on the input of the TextField when a value has been selected
	 * @default false
	 */
	blurOnSelect?: boolean;
	/** Additional properties to pass to the {@link Autocomplete} component from material-ui */
	AutocompleteProps?: Omit<MAutocompleteProps<TObject, false, boolean, false>, 'renderInput' | 'options' | 'onChange'>;
	/** Additional properties to pass to the {@link TextField} component from material-ui */
	TextFieldProps?: MTextFieldProps;
}

const contains = (toMatch: string, matchAgainst: string): boolean => toMatch.toLowerCase().includes(matchAgainst.toLowerCase());

function generateUniqueAutoCompleteKey(htmlAttributesWithData: HTMLAttributes<HTMLLIElement> & { key?: string }): string {
	return `${htmlAttributesWithData.key}-${htmlAttributesWithData['data-option-index']}`;
}

const FormAutoComplete = <
	TFieldValues extends FieldValues = FieldValues,
	TObject extends AutocompleteOption = AutocompleteOption,
	TName extends Path<TFieldValues> = Path<TFieldValues>
>({
	name,
	label,
	options,
	defaultValue,
	blurOnSelect = false,
	AutocompleteProps = {},
	TextFieldProps,
	ControllerProps
}: FormAutoCompleteProps<TFieldValues, TObject, TName>) => {
	const inputField = useRef<HTMLDivElement | null>(null);

	const {
		control,
		formState: { errors }
	} = useFormContext<TFieldValues>();

	const optionLabelGetter = (option: TObject) => option?.label ?? options.find(({ value }) => value === option.value)?.label ?? '';

	return (
		<Controller
			{...ControllerProps}
			name={name}
			control={control}
			defaultValue={defaultValue}
			render={({ field: { onChange, onBlur, ref } }) => (
				<Autocomplete<TObject, false, boolean, false>
					{...AutocompleteProps}
					disablePortal={true}
					options={options}
					getOptionLabel={optionLabelGetter}
					filterOptions={(opts, { inputValue: textFieldValue, getOptionLabel }) =>
						opts.filter((opt) => contains(getOptionLabel(opt), textFieldValue))
					}
					isOptionEqualToValue={(potentialOptionMatch, selectValueOption) => potentialOptionMatch.value === selectValueOption.value}
					autoComplete={true}
					autoHighlight={true}
					includeInputInList={true}
					onBlur={onBlur}
					ref={ref}
					renderInput={(params) => {
						// Deep merge the various TextField props that can be objects
						if (TextFieldProps?.InputProps) {
							params.InputProps = {
								...TextFieldProps.InputProps,
								...params.InputProps
							};
						}

						if (TextFieldProps?.inputProps) {
							params.inputProps = {
								...TextFieldProps.inputProps,
								...params.inputProps
							};
						}

						if (TextFieldProps?.InputLabelProps) {
							params.InputLabelProps = {
								...TextFieldProps.InputLabelProps,
								...params.InputLabelProps
							};
						}

						return (
							<TextField
								{...TextFieldProps}
								{...params}
								error={Boolean(errors[name])}
								helperText={(errors[name]?.message as StringOrUndefinedOrNull) ?? ''}
								placeholder={AutocompleteProps?.placeholder}
								label={label}
								fullWidth
								InputProps={{
									...params.InputProps,
									inputRef: inputField
								}}
							/>
						);
					}}
					onChange={(_event, data) => {
						if (blurOnSelect) {
							// Remove focus from input field
							inputField.current?.blur();
						}

						onChange(data);
					}}
					renderOption={(listItemProps, option, state) => {
						const label = optionLabelGetter(option);
						const matches = match(label, state.inputValue);
						const parts = parse(label, matches);

						return (
							<ListItem {...listItemProps} key={generateUniqueAutoCompleteKey(listItemProps)}>
								<Grid container={true} alignItems="center" alignContent="flex-start" justifyContent="flex-start">
									<Grid item={true} xs={true}>
										{parts.map((part, index) => (
											<Typography
												variant="body1"
												component="span"
												key={index}
												style={{ fontWeight: part.highlight ? 700 : 400 }}
											>
												{part.text}
											</Typography>
										))}
									</Grid>
								</Grid>
							</ListItem>
						);
					}}
				/>
			)}
		/>
	);
};

export default FormAutoComplete;
