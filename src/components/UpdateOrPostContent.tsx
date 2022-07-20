import { Button, Grid } from '@mui/material';
import { isNullishOrEmpty } from '@sapphire/utilities';
import { Dispatch, FC, SetStateAction, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { fetchWebhookMessage } from '../api/fetch-webhook-message';
import FormAutoComplete from '../components/Form/FormAutoComplete';
import FormSwitch from '../components/Form/FormSwitch';
import FormTextFieldMultiline from '../components/Form/FormTextFieldMultiline';
import FormValidationsTooltip from '../components/Form/FormValidationsTooltip';
import ReviewDialog from './Dialogs/ReviewDialog';
import type { Post } from '../models/PostModel';
import type { Update } from '../models/UpdateModel';
import FormTextField from './Form/FormTextField';
import WebhookURLInput from './WebhookUrlInput';

interface Props {
	type: 'update' | 'post';
	reviewDialogOpen: boolean;
	setReviewDialogOpen: Dispatch<SetStateAction<boolean>>;
}

const UpdateOrPostContent: FC<Props> = ({ type, reviewDialogOpen, setReviewDialogOpen }) => {
	const formContext = useFormContext<Post | Update>();
	const monacoEditorGridRef = useRef<HTMLDivElement>(null);

	const mentionRoleWatch = formContext.watch('mentionRole');
	const webhookUrlWatch = formContext.watch('webhookUrl');
	const messageIdWatch = formContext.watch('messageId');

	return (
		<>
			<ReviewDialog reviewDialogOpen={reviewDialogOpen} setReviewDialogOpen={setReviewDialogOpen} />
			<Grid container spacing={2} justifyContent="flex-start" alignContent="center" alignItems="center">
				<Grid item xs={12} ref={monacoEditorGridRef}>
					<FormTextFieldMultiline<Post | Update> name="text" monacoEditorGridRef={monacoEditorGridRef} />
				</Grid>
				{type === 'update' && (
					<>
						<Grid item xs={12}>
							<FormTextField<Update>
								label="Message ID to update"
								name="messageId"
								TextFieldProps={{
									required: true
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<Button
								fullWidth
								variant="contained"
								color="primary"
								onClick={() => fetchWebhookMessage(formContext)}
								disabled={isNullishOrEmpty(messageIdWatch) || isNullishOrEmpty(webhookUrlWatch)}
							>
								Fetch webhook message content from Discord
							</Button>
						</Grid>
					</>
				)}
				<WebhookURLInput />
				<Grid item xs={12} md={6}>
					<FormSwitch<Post | Update>
						label="Mention a role"
						name="mentionRole"
						FormControlLabelProps={{
							sx: {
								py: '9px'
							}
						}}
						onChangeSideEffect={() => formContext.resetField('role')}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					{mentionRoleWatch && (
						<FormAutoComplete<Post | Update>
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
				<Grid item xs={12} md={6}>
					<Button fullWidth variant="contained" color="primary" onClick={() => formContext.resetField('text')}>
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
							disabled={!formContext.formState.isValid}
						>
							Review post
						</Button>
					</FormValidationsTooltip>
				</Grid>
			</Grid>
		</>
	);
};

export default UpdateOrPostContent;
