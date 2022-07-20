import { Button, Grid } from '@mui/material';
import { FC, useState } from 'react';
import FormAutoComplete from '../components/Form/FormAutoComplete';
import FormTextField from '../components/Form/FormTextField';
import type { Post } from '../models/PostModel';
import type { Update } from '../models/UpdateModel';
import { loadState, LocalStorageKeys } from '../utils/localStorage';
import AddNewWebhookDialog from './Dialogs/AddNewWebhookDialog';

const WebhookURLInput: FC = () => {
	const [storedWebhooks, setStoredWebhooks] = useState(loadState(LocalStorageKeys.WebhookUrls));
	const [addWebhookDialogOpen, setAddWebhookDialogOpen] = useState(false);

	const dialogAndButton = (
		<>
			<AddNewWebhookDialog
				addWebhookDialogOpen={addWebhookDialogOpen}
				setAddWebhookDialogOpen={setAddWebhookDialogOpen}
				setStoredWebhooks={setStoredWebhooks}
			/>
			<Grid item xs={12} md={4}>
				<Button onClick={() => setAddWebhookDialogOpen(true)}>Add new Webhook URL</Button>
			</Grid>
		</>
	);

	if (storedWebhooks && storedWebhooks.length > 0) {
		return (
			<>
				{dialogAndButton}
				<Grid item xs={12} md={8}>
					<FormAutoComplete<Post | Update>
						label="Webhook URL"
						name="webhookUrl"
						options={storedWebhooks}
						TextFieldProps={{ required: true }}
					/>
				</Grid>
			</>
		);
	}

	return (
		<>
			{dialogAndButton}
			<Grid item xs={12} md={8}>
				<FormTextField<Post | Update>
					label="Webhook URL"
					name="webhookUrl"
					TextFieldProps={{
						required: true
					}}
				/>
			</Grid>
		</>
	);
};

export default WebhookURLInput;
