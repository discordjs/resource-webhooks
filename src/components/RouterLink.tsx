import { Link, LinkProps as MLinkProps } from '@mui/material';
import type { FC, ReactNode } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

interface Props {
	to: string;
	children: Exclude<ReactNode, null | undefined>;
	LinkProps?: MLinkProps;
}

const RouterLink: FC<Props> = ({ to, children, LinkProps }) => (
	<Link {...LinkProps} sx={{ color: 'primary.contrastText', ...LinkProps?.sx }} component={ReactRouterLink} to={to}>
		{children}
	</Link>
);

export default RouterLink;
