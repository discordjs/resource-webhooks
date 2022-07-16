import { Typography } from '@mui/material';
import { Component, type ErrorInfo, type ReactNode } from 'react';
import RouterLink from './RouterLink';

interface Props {
	/** React children to render */
	children?: ReactNode;
}

interface State {
	hasError: boolean;
}

class AppErrorBoundary extends Component<Props, State> {
	public constructor(props: Props) {
		super(props);
		this.state = { hasError: false };
	}

	public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error(error);
		console.error(errorInfo);
	}

	public override render() {
		const { hasError } = this.state;

		if (hasError) {
			return (
				<Typography variant="h1" align="center" sx={{ fontSize: '2em', display: 'grid', placeContent: 'center' }}>
					An unexpected error occurred.
					<br />
					Check the dev console and contact Favna to fix it.
					<br />
					<br />
					<RouterLink to="/home">Go back to the home page</RouterLink>
				</Typography>
			);
		}

		return this.props.children;
	}

	public static getDerivedStateFromError(_error: Error) {
		return { hasError: true };
	}
}

export default AppErrorBoundary;
