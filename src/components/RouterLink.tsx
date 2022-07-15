import { Link, LinkProps as MLinkProps } from '@mui/material';
import type { FC } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

interface Props {
	label: string;
	to: string;
	LinkProps?: MLinkProps;
}

const RouterLink: FC<Props> = ({ to, label, LinkProps }) => (
	<Link {...LinkProps} sx={{ color: 'primary.contrastText', ...LinkProps?.sx }} component={ReactRouterLink} to={to}>
		{label}
	</Link>
);

export default RouterLink;
