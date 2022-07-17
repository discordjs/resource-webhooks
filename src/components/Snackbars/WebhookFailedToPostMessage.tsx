import { Link, List, ListItem, ListItemText } from '@mui/material';

const WebhookFailedToPostMessage = (): JSX.Element => (
	<List disablePadding>
		<ListItem disablePadding>
			<ListItemText
				primary="Failed to post Webhook message, validate your input and/or check the dev console for more details."
				primaryTypographyProps={{ variant: 'body1' }}
			/>
		</ListItem>
		<ListItem disablePadding>
			<ListItemText
				primary={
					<>
						Make sure you have no browser extensions that are blocking discord.com, i.e.{' '}
						<Link href="https://privacybadger.org" target="_blank" color="text.primary">
							Privacy Badger
						</Link>
					</>
				}
				primaryTypographyProps={{
					variant: 'body2'
				}}
			/>
		</ListItem>
	</List>
);

export default WebhookFailedToPostMessage;
