import { FormControlLabel, Grid, Switch } from '@mui/material';
import { FC, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import FormAutoComplete from '../components/Form/FormAutoComplete';
import FormTextField from '../components/Form/FormTextField';
import type { Post } from '../models/PostModel';
import type { Update } from '../models/UpdateModel';
import { loadState, LocalStorageKeys } from '../utils/localStorage';

const WebhookURLInput: FC = () => {
	const [addNewWebhookUrl, setAddNewWebhookUrl] = useState(false);

	const formContext = useFormContext<Post | Update>();

	const storedWebhookUrls = loadState<string[]>(LocalStorageKeys.WebhookUrls);

	if (storedWebhookUrls && storedWebhookUrls.length > 0) {
		return (
			<>
				<Grid item xs={12} md={3}>
					<FormControlLabel
						control={
							<Switch
								onChange={(event) => {
									formContext.resetField('webhookUrl');
									return setAddNewWebhookUrl(event.target.checked);
								}}
								checked={addNewWebhookUrl}
							/>
						}
						label="Add new Webhook URL"
					/>
				</Grid>
				<Grid item xs={12} md={9}>
					{addNewWebhookUrl ? (
						<FormTextField<Post | Update>
							label="Webhook URL"
							name="webhookUrl"
							TextFieldProps={{
								required: true
							}}
						/>
					) : (
						<FormAutoComplete<Post | Update, string>
							label="Webhook URL"
							name="webhookUrl"
							options={storedWebhookUrls}
							TextFieldProps={{ required: true }}
						/>
					)}
				</Grid>
			</>
		);
	}

	return (
		<Grid item xs={12}>
			<FormTextField<Post | Update>
				label="Webhook URL"
				name="webhookUrl"
				TextFieldProps={{
					required: true
				}}
			/>
		</Grid>
	);
};

export default WebhookURLInput;
