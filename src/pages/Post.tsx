import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import { useState, type Dispatch, type FC, type SetStateAction } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { sendWebhookMessage } from '../api/send-webhook-message';
import UpdateOrPostContent from '../components/UpdateOrPostContent';
import type { Post } from '../models/PostModel';
import { loadState, LocalStorageKeys, saveState } from '../utils/localStorage';
import { postSchema } from '../validations/postSchema';

interface PostPageProps {
	setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const PostPage: FC<PostPageProps> = ({ setIsLoading }) => {
	const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
	const [saveWebhookUrlToLocalhost, setSaveWebhookUrlToLocalhost] = useState(false);

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
			await sendWebhookMessage(data, 'post');

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

	return (
		<Box sx={{ mt: 2 }}>
			<FormProvider {...formHookMethods}>
				<form onSubmit={formHookMethods.handleSubmit(handleSubmit)}>
					<UpdateOrPostContent
						type="post"
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

export default PostPage;
