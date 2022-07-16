import { Backdrop, CircularProgress, useTheme } from '@mui/material';
import { useEffect, useState, type FC } from 'react';

interface Props {
	isLoading: boolean;
}

const Loading: FC<Props> = ({ isLoading }) => {
	const theme = useTheme();

	const [activeElement, setActiveElement] = useState<HTMLElement | null>(null);

	useEffect(() => {
		if (isLoading && document.activeElement instanceof HTMLElement && activeElement === null) {
			const { activeElement } = document;
			activeElement.blur();
			activeElement.setAttribute('disabled', 'true');
			setActiveElement(activeElement);
		} else if (document.activeElement instanceof HTMLElement && activeElement && activeElement instanceof HTMLElement) {
			activeElement.removeAttribute('disabled');
			activeElement.focus();
			setActiveElement(null);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading]);

	return (
		<Backdrop
			sx={{
				zIndex: theme.zIndex.modal + 1,
				cursor: 'default'
			}}
			open={isLoading}
			unmountOnExit={true}
			mountOnEnter={true}
		>
			<CircularProgress size={100} color="primary" id="loading_indicator" disableShrink={true} />
		</Backdrop>
	);
};

export default Loading;
