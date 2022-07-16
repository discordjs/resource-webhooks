import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Link } from '@mui/material';
import Markdown from 'marked-react';
import type { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { useFormContext } from 'react-hook-form';
import { bold } from '../api/formatters';
import type { Post } from '../models/PostModel';
import type { Update } from '../models/UpdateModel';
import { linkEscapeRegex, linkEscapeReplacer } from '../utils/linkReplacer';

interface Props {
	reviewDialogOpen: boolean;
	setReviewDialogOpen: Dispatch<SetStateAction<boolean>>;
}

const ReviewDialog: FC<Props> = ({ reviewDialogOpen, setReviewDialogOpen }) => {
	const formContext = useFormContext<Post | Update>();

	const parseText = () => {
		let [mentionRole, role, text] = formContext.getValues(['mentionRole', 'role', 'text']);

		if (mentionRole && role) {
			text = `${bold('New announcement for')} @${role.label.replace(/(.+) - \d{18,}/, '$1')}:\n${text}`;
		}

		return text.replace(linkEscapeRegex, linkEscapeReplacer).replaceAll('_ _', '');
	};

	return (
		<Dialog open={reviewDialogOpen} disableEscapeKeyDown disablePortal>
			<DialogTitle>Webhook message review</DialogTitle>
			<DialogContent>
				<Markdown
					openLinksInNewTab
					gfm
					breaks
					isInline
					renderer={{
						link(href: string, text: ReactNode) {
							return (
								<Link target="_blank" href={href} color="primary.dark" underline="hover" sx={{ color: 'rgb(0,175,244)' }}>
									{text}
								</Link>
							);
						}
					}}
				>
					{parseText()}
				</Markdown>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setReviewDialogOpen(false)}>Cancel</Button>
				<Button type="submit">Confirm</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ReviewDialog;
