import { Link, LinkProps as MLinkProps } from '@mui/material';
import { forwardRef, type FC } from 'react';
import { Link as ReactRouterLink, LinkProps as ReactRouterLinkProps } from 'react-router-dom';

interface LinkBehaviorProps extends Omit<ReactRouterLinkProps, 'to'> {
	to: string;
}

const ForwardPropsLink = forwardRef<HTMLAnchorElement, LinkBehaviorProps>(({ to, ...props }, ref) => (
	<ReactRouterLink ref={ref} to={to} {...props} />
));

interface Props {
	label: string;
	to: string;
	LinkProps?: MLinkProps;
}

const RouterLink: FC<Props> = ({ to, label, LinkProps }) => {
	return (
		<Link {...LinkProps} component={ForwardPropsLink} to={to}>
			{label}
		</Link>
	);
};

export default RouterLink;
