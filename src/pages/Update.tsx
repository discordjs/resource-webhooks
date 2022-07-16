import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import { useState, type Dispatch, type FC, type SetStateAction } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { sendWebhookMessage } from '../api/send-webhook-message';
import UpdateOrPostContent from '../components/UpdateOrPostContent';
import type { Update } from '../models/UpdateModel';
import { loadState, LocalStorageKeys, saveState } from '../utils/localStorage';
import { postSchema } from '../validations/postSchema';

interface UpdatePageProps {
	setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const UpdatePage: FC<UpdatePageProps> = ({ setIsLoading }) => {
	const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
	const [saveWebhookUrlToLocalhost, setSaveWebhookUrlToLocalhost] = useState(false);

	const formHookMethods = useForm<Update>({
		resolver: yupResolver(postSchema),
		mode: 'all',
		defaultValues: {
			webhookUrl: '',
			text: '',
			messageId: '',
			mentionRole: false,
			role: null
		}
	});

	const handleSubmit: SubmitHandler<Update> = async (data) => {
		try {
			setIsLoading(true);
			await sendWebhookMessage(data, 'update');

			if (saveWebhookUrlToLocalhost) {
				const currentlyStoredWebhookUrls = new Set(loadState<string[]>(LocalStorageKeys.WebhookUrls));
				currentlyStoredWebhookUrls.add(data.webhookUrl);

				saveState<string[]>(LocalStorageKeys.WebhookUrls, [...currentlyStoredWebhookUrls.values()]);
			}

			formHookMethods.resetField('text');

			enqueueSnackbar('Successfully updated Webhook message!', { variant: 'success' });
			setReviewDialogOpen(false);
		} catch (error) {
			enqueueSnackbar('Failed to patch Webhook message, validate your input and/or check the dev console for more details.', {
				variant: 'error'
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Box sx={{ mt: 2 }}>
			<FormProvider {...formHookMethods}>
				<form onSubmit={formHookMethods.handleSubmit(handleSubmit)}>
					<UpdateOrPostContent
						type="update"
						reviewDialogOpen={reviewDialogOpen}
						saveWebhookUrlToLocalhost={saveWebhookUrlToLocalhost}
						setReviewDialogOpen={setReviewDialogOpen}
						setSaveWebhookUrlToLocalhost={setSaveWebhookUrlToLocalhost}
					/>
				</form>
			</FormProvider>
		</Box>
	);
};

export default UpdatePage;
