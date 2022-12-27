import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Link } from '@mui/material';
import type { Components } from '@skyra/discord-components-core';
import { DiscordMessage, DiscordMessages } from '@skyra/discord-components-react';
import Markdown from 'marked-react';
import { Dispatch, FC, ReactNode, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { fetchWebhookProfile } from '../../api/fetch-webhook-profile';
import { bold } from '../../api/formatters';
import type { Post } from '../../models/PostModel';
import type { Update } from '../../models/UpdateModel';
import { linkEscapeRegex, linkEscapeReplacer } from '../../utils/linkReplacer';

interface Props {
	type: 'update' | 'post';
	reviewDialogOpen: boolean;
	setReviewDialogOpen: Dispatch<SetStateAction<boolean>>;
}

const ReviewDialog: FC<Props> = ({ type, reviewDialogOpen, setReviewDialogOpen }) => {
	const formContext = useFormContext<Post | Update>();
	const [webhookProfile, setWebhookProfile] = useState<Partial<Components.DiscordMessage> | null>(null);

	const parseText = () => {
		let [mentionRole, role, text] = formContext.getValues(['mentionRole', 'role', 'text']);

		if (mentionRole && role && !text.startsWith(bold('New announcement for'))) {
			text = `${bold('New announcement for')} @${role.label.replace(/(.+) - \d{18,}/, '$1')}:\n${text}`;
		}

		return text.replace(linkEscapeRegex, linkEscapeReplacer).replaceAll('_ _', '');
	};

	const getWebhookProfileData = useCallback(async () => {
		setWebhookProfile(await fetchWebhookProfile(formContext, { isEdited: type === 'update' }));
	}, [formContext, type]);

	useEffect(() => {
		void getWebhookProfileData();
	}, [getWebhookProfileData]);

	return (
		<Dialog open={reviewDialogOpen} disableEscapeKeyDown disablePortal>
			<DialogTitle>Webhook message review</DialogTitle>
			<DialogContent>
				<DiscordMessages>
					<DiscordMessage {...webhookProfile}>
						<Markdown
							openLinksInNewTab
							gfm
							breaks
							isInline
							renderer={{
								link: (href: string, text: ReactNode) => (
									<Link
										key={href}
										target="_blank"
										href={href}
										color="primary.dark"
										underline="hover"
										sx={{ color: 'rgb(0,175,244)' }}
									>
										{text}
									</Link>
								)
							}}
						>
							{parseText()}
						</Markdown>
					</DiscordMessage>
				</DiscordMessages>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setReviewDialogOpen(false)}>Cancel</Button>
				<Button type="submit">Confirm</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ReviewDialog;
