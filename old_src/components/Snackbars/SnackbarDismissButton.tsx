import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useSnackbar, type SnackbarKey } from 'notistack';
import type { FC } from 'react';

interface SnackbarDismissButtonProps {
	snackbarKey: SnackbarKey;
}

const SnackbarDismissButton: FC<SnackbarDismissButtonProps> = ({ snackbarKey }) => {
	const { closeSnackbar } = useSnackbar();

	return (
		<IconButton aria-label="close" color="inherit" sx={{ p: 0.5 }} onClick={() => closeSnackbar(snackbarKey)}>
			<Close />
		</IconButton>
	);
};

export default SnackbarDismissButton;
