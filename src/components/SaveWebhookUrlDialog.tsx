import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import uniqueBy from 'lodash.uniqby';
import { useRef, type Dispatch, type FC, type SetStateAction } from 'react';
import { useFormContext } from 'react-hook-form';
import type { Post } from '../models/PostModel';
import type { Update } from '../models/UpdateModel';
import { loadState, LocalStorageKeys, saveState } from '../utils/localStorage';
import type { AutocompleteOption } from './Form/FormAutoComplete';

interface Props {
	saveWebhookUrlDialogOpen: boolean;
	setSaveWebhookUrlDialogOpen: Dispatch<SetStateAction<boolean>>;
}

const SaveWebhookUrlDialog: FC<Props> = ({ saveWebhookUrlDialogOpen, setSaveWebhookUrlDialogOpen }) => {
	const formContext = useFormContext<Post | Update>();
	const labelFieldRef = useRef<HTMLInputElement | null>(null);

	const handleSubmit = () => {
		if (labelFieldRef.current) {
			const webhookUrl = formContext.getValues('webhookUrl');
			const webhookLabel = labelFieldRef.current.value;

			const currentlyStoredWebhookUrls = loadState<AutocompleteOption[]>(LocalStorageKeys.WebhookUrls) ?? [];
			currentlyStoredWebhookUrls.push({
				label: webhookLabel,
				value: webhookUrl
			});

			const uniqueWebhookUrls = uniqueBy(currentlyStoredWebhookUrls, 'value');

			saveState<AutocompleteOption[]>(LocalStorageKeys.WebhookUrls, uniqueWebhookUrls);

			enqueueSnackbar('Successfully stored webhook URL in Local Storage. Refresh the screen for this to take effect.');

			setSaveWebhookUrlDialogOpen(false);
		}
	};

	return (
		<Dialog open={saveWebhookUrlDialogOpen} disableEscapeKeyDown disablePortal>
			<DialogTitle>Assign a label to the saved Webhook URL</DialogTitle>
			<DialogContent sx={{ pt: '20px !important' }}>
				<TextField fullWidth required label="Label" inputRef={labelFieldRef} />
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setSaveWebhookUrlDialogOpen(false)}>Cancel</Button>
				<Button onClick={handleSubmit}>Confirm</Button>
			</DialogActions>
		</Dialog>
	);
};

export default SaveWebhookUrlDialog;
