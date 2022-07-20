import PencilIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, ButtonGroup, IconButton, Link, Tooltip, Typography } from '@mui/material';
import { deepClone } from '@sapphire/utilities';
import { useSnackbar } from 'notistack';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import AddNewWebhookDialog from '../components/Dialogs/AddNewWebhookDialog';
import ConfirmationDialog from '../components/Dialogs/ConfirmationDialog';
import Table from '../components/Table/Table';
import { useDarkModeContext } from '../utils/darkModeContext';
import { loadState, LocalStorageKeys, saveState, type LocalStorageEntry } from '../utils/localStorage';

interface Props {
	setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const WebhookConfig: FC<Props> = ({ setIsLoading }) => {
	const isDarkMode = useDarkModeContext();
	const { enqueueSnackbar } = useSnackbar();

	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [addWebhookDialogOpen, setAddWebhookDialogOpen] = useState(false);
	const [, setUpdateDialogOpen] = useState(false);
	const [webhookUrlDialogOpen, setWebhookUrlDialogOpen] = useState('');
	const [storedWebhooks, setStoredWebhooks] = useState(loadState(LocalStorageKeys.WebhookUrls));

	const deleteConfirmationDialogText = (webhook: LocalStorageEntry) => (
		<>
			Are you sure you want to delete the Webhook URL <Link href={webhook.value}>{webhook.value}</Link>
			with label <strong>{webhook.label}</strong>
		</>
	);

	const handleCancelDeleteWebhook = () => {
		setDeleteDialogOpen(false);
		setWebhookUrlDialogOpen('');
	};

	const handleDeleteWebhook = (webhook: LocalStorageEntry) => {
		setIsLoading(true);
		const clonedStoredWebhooks = deepClone(storedWebhooks);

		clonedStoredWebhooks.splice(
			clonedStoredWebhooks.findIndex((wh) => wh.value === webhook.value),
			1
		);

		setStoredWebhooks(clonedStoredWebhooks);
		saveState(LocalStorageKeys.WebhookUrls, clonedStoredWebhooks);

		enqueueSnackbar('Successfully deleted webhook from Local Storage.', { variant: 'success' });
		handleCancelDeleteWebhook();
		setIsLoading(false);
	};

	if (!storedWebhooks.length) {
		return (
			<>
				<AddNewWebhookDialog
					addWebhookDialogOpen={addWebhookDialogOpen}
					setAddWebhookDialogOpen={setAddWebhookDialogOpen}
					setStoredWebhooks={setStoredWebhooks}
				/>
				<Typography
					variant="h4"
					color="textPrimary"
					sx={{
						display: 'grid',
						placeContent: 'center',
						height: '100%'
					}}
				>
					No stored webhook URLs found
				</Typography>
				<Button fullWidth={true} onClick={() => setAddWebhookDialogOpen(true)}>
					Add new Webhook URL
				</Button>
			</>
		);
	}

	return (
		<Table<LocalStorageEntry>
			collGroups={['10%', '80%', '10%']}
			data={[
				...storedWebhooks,
				...storedWebhooks,
				...storedWebhooks,
				...storedWebhooks,
				...storedWebhooks,
				...storedWebhooks,
				...storedWebhooks,
				...storedWebhooks,
				...storedWebhooks,
				...storedWebhooks,
				...storedWebhooks,
				...storedWebhooks,
				...storedWebhooks,
				...storedWebhooks,
				...storedWebhooks,
				...storedWebhooks,
				...storedWebhooks,
				...storedWebhooks
			]}
			defaultSorting={{
				label: 'asc',
				value: 'unsorted'
			}}
			PaperProps={{
				sx: {
					mt: 2,
					mb: 30
				}
			}}
			TableBodyRowProps={(_) => ({
				hover: true
			})}
			headers={{
				label: {
					label: 'Label'
				},
				value: {
					label: 'URL'
				},
				actions: {
					label: 'Actions'
				}
			}}
			ContentToRenderBelowRowCells={(webhook) => (
				<>
					<ConfirmationDialog
						isOpen={webhookUrlDialogOpen === webhook.value && deleteDialogOpen}
						confirmationHeader="Delete Webhook"
						confirmationText={deleteConfirmationDialogText(webhook)}
						onSubmit={() => handleDeleteWebhook(webhook)}
						onCancel={handleCancelDeleteWebhook}
					/>
					{/* TODO: Update Dialog */}
				</>
			)}
			cellRenderStrategy={{
				label: {
					render: ({ value }) => value
				},
				value: {
					render: ({ value }) => (
						<Link color={isDarkMode ? 'info.main' : 'primary.main'} target="_blank" rel="noreferrer" href={value} underline="always">
							{value}
						</Link>
					)
				},
				actions: {
					render: ({ object }) => (
						<ButtonGroup color="inherit">
							<Tooltip title="Update">
								<IconButton
									color="inherit"
									onClick={() => {
										setWebhookUrlDialogOpen(object.value);
										setUpdateDialogOpen(true);
									}}
								>
									<PencilIcon />
								</IconButton>
							</Tooltip>

							<Tooltip title="Delete">
								<IconButton
									color="inherit"
									onClick={() => {
										setWebhookUrlDialogOpen(object.value);
										setDeleteDialogOpen(true);
									}}
								>
									<DeleteIcon />
								</IconButton>
							</Tooltip>
						</ButtonGroup>
					)
				}
			}}
		/>
	);
};

export default WebhookConfig;
