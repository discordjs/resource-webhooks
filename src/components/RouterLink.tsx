import { Link, LinkProps as MLinkProps } from '@mui/material';
import type { FC, ReactNode } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useDarkModeContext } from '../utils/darkModeContext';

interface Props {
	to: string;
	children: Exclude<ReactNode, null | undefined>;
	LinkProps?: MLinkProps;
}

const RouterLink: FC<Props> = ({ to, children, LinkProps }) => {
	const isDarkMode = useDarkModeContext();

	return (
		<Link
			{...LinkProps}
			sx={{ color: isDarkMode ? 'primary.contrastText' : 'text.primary', ...LinkProps?.sx }}
			component={ReactRouterLink}
			to={to}
		>
			{children}
		</Link>
	);
};

export default RouterLink;
