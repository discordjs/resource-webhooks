import { Box, Paper } from '@mui/material';
import PoweredByVercel from './PoweredByVercel';

const Footer = () => {
	return (
		<Paper square sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, maxHeight: 64, minHeight: 64 }} elevation={3}>
			<Box
				sx={{
					display: 'grid',
					placeContent: 'center',
					height: 64
				}}
			>
				<PoweredByVercel />
			</Box>
		</Paper>
	);
};

export default Footer;
