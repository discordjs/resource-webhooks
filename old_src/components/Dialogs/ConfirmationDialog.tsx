import {
	Button,
	ButtonProps,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogContentTextProps,
	DialogProps as MDialogProps,
	DialogTitle
} from '@mui/material';
import type { Awaitable } from '@sapphire/utilities';
import type { FC, MouseEvent, ReactNode } from 'react';

interface Props {
	/**
	 * Whether the confirmation dialog is open or not.
	 * Manage this in the components' local state!
	 */
	isOpen: boolean;
	/** The text that is to be shown in the header of the dialog */
	confirmationHeader: string;
	/** The text that is to be shown in the body of the dialog */
	confirmationText: NonNullable<ReactNode>;
	/**
	 * The text that is to be shown for the cancel button
	 * @default 'Cancel'
	 */
	cancelText?: string;
	/**
	 * The text that is to be shown for the submit button
	 * @default 'Ok'
	 */
	submitText?: string;
	/** Additional props to pass to the {@link Dialog} component */
	DialogProps?: Partial<MDialogProps>;
	/** Additional props to pass to the {@link DialogContentText} component */
	TextProps?: DialogContentTextProps & { component?: string };
	/** Additional props to pass to the cancel {@link Button} component */
	CancelButtonProps?: ButtonProps;
	/** Additional props to pass to the submit {@link Button} component */
	SubmitButtonProps?: ButtonProps;
	/**
	 * The action to perform when submitting / confirming the dialog
	 * @remark This can return either `void` or `Promise<void>`
	 */
	onSubmit(event: MouseEvent<HTMLButtonElement>, ...args: unknown[]): Awaitable<void>;
	/**
	 * The action to perform when cancelling the dialog
	 * @remark This can return either `void` or `Promise<void>`
	 */
	onCancel(event: MouseEvent<HTMLButtonElement>, ...args: unknown[]): Awaitable<void>;
}

const ConfirmationDialog: FC<Props> = ({
	isOpen,
	confirmationText,
	confirmationHeader,
	cancelText = 'Cancel',
	submitText = 'Ok',
	DialogProps,
	TextProps,
	CancelButtonProps,
	SubmitButtonProps,
	onCancel,
	onSubmit
}) => (
	<Dialog open={isOpen} {...DialogProps}>
		<DialogTitle
			sx={{
				borderBottom: '1px solid #ccc'
			}}
		>
			{confirmationHeader}
		</DialogTitle>
		<DialogContent
			sx={{
				display: 'grid',
				placeContent: 'center',
				pt: 3
			}}
		>
			<DialogContentText {...TextProps}>{confirmationText}</DialogContentText>
		</DialogContent>

		<DialogActions>
			<Button onClick={onCancel} color="primary" {...CancelButtonProps}>
				{cancelText}
			</Button>
			<Button onClick={onSubmit} color="primary" {...SubmitButtonProps}>
				{submitText}
			</Button>
		</DialogActions>
	</Dialog>
);

export default ConfirmationDialog;
