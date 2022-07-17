import { Link, List, ListItem, ListItemText } from '@mui/material';

const WebhookNotSavedMessage = (): JSX.Element => (
	<List disablePadding>
		<ListItem disablePadding>
			<ListItemText
				primary="Webhook URL was not saved because the URL was already stored in the LocalStorage"
				primaryTypographyProps={{ variant: 'body1' }}
			/>
		</ListItem>
		<ListItem disablePadding>
			<ListItemText
				primary={
					<>
						If you want to change the label of the URL then you can do so through the{' '}
						<Link href="/config" target="_self" color="text.primary">
							Configuration
						</Link>{' '}
						page
					</>
				}
				primaryTypographyProps={{
					variant: 'body2'
				}}
			/>
		</ListItem>
	</List>
);

export default WebhookNotSavedMessage;
