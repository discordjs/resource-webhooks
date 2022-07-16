import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, FormControlLabel, Grid, Switch } from '@mui/material';
import { useState, type Dispatch, type FC, type SetStateAction } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { createWebhookPost } from '../api/post-webhook';
import FormAutoComplete from '../components/Form/FormAutoComplete';
import FormSwitch from '../components/Form/FormSwitch';
import FormTextField from '../components/Form/FormTextField';
import FormTextFieldMultiline from '../components/Form/FormTextFieldMultiline';
import FormValidationsTooltip from '../components/Form/FormValidationsTooltip';
import ReviewDialog from '../components/ReviewDialog';
import type { Post } from '../models/PostModel';
import { loadState, LocalStorageKeys, saveState } from '../utils/localStorage';
import { postSchema } from '../validations/postSchema';

interface PostPageProps {
	setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const PostPage: FC<PostPageProps> = ({ setIsLoading }) => {
	const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
	const [saveWebhookUrlToLocalhost, setSaveWebhookUrlToLocalhost] = useState(false);
	const [addNewWebhookUrl, setAddNewWebhookUrl] = useState(false);
	const storedWebhookUrls = loadState<string[]>(LocalStorageKeys.WebhookUrls);

	const formHookMethods = useForm<Post>({
		resolver: yupResolver(postSchema),
		mode: 'all',
		defaultValues: {
			webhookUrl: '',
			text: '',
			mentionRole: false,
			role: null
		}
	});

	const handleSubmit: SubmitHandler<Post> = async (data) => {
		try {
			setIsLoading(true);
			await createWebhookPost(data);

			if (saveWebhookUrlToLocalhost) {
				const currentlyStoredWebhookUrls = new Set(loadState<string[]>(LocalStorageKeys.WebhookUrls));
				currentlyStoredWebhookUrls.add(data.webhookUrl);

				saveState<string[]>(LocalStorageKeys.WebhookUrls, [...currentlyStoredWebhookUrls.values()]);
			}

			formHookMethods.resetField('text');

			enqueueSnackbar('Successfully posted Webhook message!', { variant: 'success' });
			setReviewDialogOpen(false);
		} catch (error) {
			enqueueSnackbar('Failed to post Webhook message, validate your input and/or check the dev console for more details.', {
				variant: 'error'
			});
		} finally {
			setIsLoading(false);
		}
	};

	const mentionRoleWatch = formHookMethods.watch('mentionRole');

	const renderWebhookUrlInput = () => {
		if (storedWebhookUrls && storedWebhookUrls.length > 0) {
			return (
				<>
					<Grid item xs={12} md={3}>
						<FormControlLabel
							control={
								<Switch
									onChange={(event) => {
										formHookMethods.resetField('webhookUrl');
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
							<FormTextField<Post>
								label="Webhook URL"
								name="webhookUrl"
								TextFieldProps={{
									required: true
								}}
							/>
						) : (
							<FormAutoComplete<Post, string>
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
				<FormTextField<Post>
					label="Webhook URL"
					name="webhookUrl"
					TextFieldProps={{
						required: true
					}}
				/>
			</Grid>
		);
	};

	return (
		<Box sx={{ mt: 2 }}>
			<FormProvider {...formHookMethods}>
				<form onSubmit={formHookMethods.handleSubmit(handleSubmit)}>
					<ReviewDialog reviewDialogOpen={reviewDialogOpen} setReviewDialogOpen={setReviewDialogOpen} />
					<Grid container spacing={2} justifyContent="flex-start" alignContent="center" alignItems="center">
						<Grid item xs={12}>
							<FormTextFieldMultiline<Post>
								label="Text to send"
								name="text"
								minRows={4}
								maxRows={16}
								TextFieldProps={{
									required: true,
									autoFocus: true
								}}
							/>
						</Grid>
						{renderWebhookUrlInput()}
						<Grid item xs={12} md={6}>
							<FormSwitch<Post>
								label="Mention a role"
								name="mentionRole"
								FormControlLabelProps={{
									sx: {
										py: '9px'
									}
								}}
								onChangeSideEffect={() => formHookMethods.resetField('role')}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							{mentionRoleWatch && (
								<FormAutoComplete<Post>
									label="Role to mention"
									name="role"
									options={[
										{
											label: 'Ping Me For Announcements - 912088476290273300',
											value: '912088476290273300'
										},
										{
											label: 'Dragonite does repo maintenance - 901237389257744426',
											value: `901237389257744426`
										}
									]}
								/>
							)}
						</Grid>
						<Grid item xs={12}>
							<FormControlLabel
								control={
									<Switch
										onChange={(event) => setSaveWebhookUrlToLocalhost(event.target.checked)}
										checked={saveWebhookUrlToLocalhost}
									/>
								}
								label="Save Webhook URL to LocalStorage?"
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<Button fullWidth variant="contained" color="primary" onClick={() => formHookMethods.resetField('text')}>
								Clear text input
							</Button>
						</Grid>

						<Grid item xs={12} md={6}>
							<FormValidationsTooltip>
								<Button
									fullWidth
									variant="contained"
									color="primary"
									onClick={() => setReviewDialogOpen(true)}
									disabled={!formHookMethods.formState.isValid}
								>
									Review post
								</Button>
							</FormValidationsTooltip>
						</Grid>
					</Grid>
				</form>
			</FormProvider>
		</Box>
	);
};

export default PostPage;
