import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import uniqueBy from 'lodash.uniqby';
import { useSnackbar } from 'notistack';
import type { Dispatch, FC, SetStateAction } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { loadState, LocalStorageEntry, LocalStorageKeys, saveState } from '../../utils/localStorage';
import { addNewWebhookSchema } from '../../validations/addNewWebhookSchema';
import FormTextField from '../Form/FormTextField';
import WebhookNotSavedMessage from '../Snackbars/WebhookNotSavedMessage';

interface Props {
	addWebhookDialogOpen: boolean;
	setAddWebhookDialogOpen: Dispatch<SetStateAction<boolean>>;
	setStoredWebhooks: Dispatch<SetStateAction<LocalStorageEntry[]>>;
}

const AddNewWebhookDialog: FC<Props> = ({ addWebhookDialogOpen, setAddWebhookDialogOpen, setStoredWebhooks }) => {
	const { enqueueSnackbar } = useSnackbar();

	const formHookMethods = useForm<LocalStorageEntry>({
		resolver: yupResolver(addNewWebhookSchema),
		mode: 'all',
		defaultValues: {
			value: '',
			label: ''
		},
		shouldUnregister: true
	});

	const handleSubmit: SubmitHandler<LocalStorageEntry> = (data) => {
		const currentlyStoredWebhooks = loadState(LocalStorageKeys.WebhookUrls);
		currentlyStoredWebhooks.push({
			label: data.label,
			value: data.value
		});

		const uniqueWebhookUrls = uniqueBy(currentlyStoredWebhooks, 'value');

		if (uniqueWebhookUrls.length + 1 === currentlyStoredWebhooks.length) {
			enqueueSnackbar(WebhookNotSavedMessage(), { variant: 'info' });
		} else {
			saveState(LocalStorageKeys.WebhookUrls, uniqueWebhookUrls);
			setStoredWebhooks(uniqueWebhookUrls);

			enqueueSnackbar('Successfully stored webhook URL in Local Storage.', { variant: 'success' });

			setAddWebhookDialogOpen(false);
		}
	};

	return (
		<Dialog
			open={addWebhookDialogOpen}
			disableEscapeKeyDown
			sx={{
				'.MuiPaper-root': {
					minWidth: {
						xs: '95%',
						md: 600
					}
				}
			}}
		>
			<DialogTitle>Add a new Webhook URL</DialogTitle>
			<FormProvider {...formHookMethods}>
				<form onSubmit={formHookMethods.handleSubmit(handleSubmit)}>
					<DialogContent sx={{ pt: '20px !important' }}>
						<Grid container spacing={2} justifyContent="flex-start" alignItems="center" alignContent="center">
							<Grid item xs={12}>
								<FormTextField<LocalStorageEntry>
									label="Webhook Label"
									name="label"
									TextFieldProps={{
										required: true,
										autoFocus: true
									}}
								/>
							</Grid>

							<Grid item xs={12}>
								<FormTextField<LocalStorageEntry>
									label="Webhook URL"
									name="value"
									TextFieldProps={{
										required: true
									}}
								/>
							</Grid>
						</Grid>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => setAddWebhookDialogOpen(false)}>Cancel</Button>
						<Button type="submit">Add Webhook URL</Button>
					</DialogActions>
				</form>
			</FormProvider>
		</Dialog>
	);
};

export default AddNewWebhookDialog;
