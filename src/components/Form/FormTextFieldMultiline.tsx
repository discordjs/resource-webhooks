import { FormHelperText } from '@mui/material';
import getProperty from 'lodash.get';
import type { RefObject } from 'react';
import { Controller, useFormContext, type FieldValues, type Path } from 'react-hook-form';
import AutoSizer from 'react-virtualized-auto-sizer';

import MonacoEditor from '@monaco-editor/react';

import type { CommonFormFieldProps, StringOrUndefinedOrNull } from './types';

interface FormTextFieldMultilineProps<TFieldValues extends FieldValues = FieldValues, TName extends Path<TFieldValues> = Path<TFieldValues>>
	extends CommonFormFieldProps<TFieldValues, TName> {
	/**
	 * The ref to the parent grid element to retrieve its width
	 */
	monacoEditorGridRef: RefObject<HTMLDivElement>;
}

const FormTextFieldMultiline = <TFieldValues extends FieldValues = FieldValues, TName extends Path<TFieldValues> = Path<TFieldValues>>({
	name,
	defaultValue,
	monacoEditorGridRef,
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
			render={({ field }) => {
				// Unref Monaco editor from react-hook-form
				Reflect.deleteProperty(field, 'ref');

				return (
					<>
						<AutoSizer disableHeight defaultWidth={monacoEditorGridRef.current?.clientWidth ?? 1000}>
							{({ width }) => (
								<MonacoEditor
									width={width}
									height={200}
									defaultValue={defaultValue}
									{...field}
									language="markdown"
									theme="vs-dark"
									options={{
										selectOnLineNumbers: true,
										wordWrap: 'on',
										wrappingStrategy: 'advanced',
										minimap: {
											enabled: false
										},
										autoClosingQuotes: 'always',
										bracketPairColorization: {
											enabled: true
										},
										colorDecorators: true,
										cursorBlinking: 'expand',
										cursorSmoothCaretAnimation: true,
										fontLigatures: true,
										fontFamily: '"Fira Code", "JetBrains Mono", "Menlo", "Monaco", "Consolas", "Courier New", "monospace"',
										formatOnPaste: true,
										guides: {
											bracketPairs: true
										},
										rulers: [120],
										'semanticHighlighting.enabled': true,
										smartSelect: {
											selectLeadingAndTrailingWhitespace: true
										},
										tabCompletion: 'on',
										useShadowDOM: true
									}}
									onMount={(editor) => editor.focus()}
								/>
							)}
						</AutoSizer>
						<FormHelperText error={Boolean(getProperty(errors, name))}>
							{(getProperty(errors, name)?.message as StringOrUndefinedOrNull) ?? ''}
						</FormHelperText>
					</>
				);
			}}
		/>
	);
};

export default FormTextFieldMultiline;
