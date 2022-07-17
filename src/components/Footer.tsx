import { Box, Paper } from '@mui/material';

const Footer = () => (
	<Paper square sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, maxHeight: 64, minHeight: 64 }} elevation={3}>
		<Box
			sx={{
				display: 'grid',
				placeContent: 'center',
				height: 64
			}}
		>
			<img src="/img/powered-by-vercel.svg" alt="Powered by Vercel" />
		</Box>
	</Paper>
);

export default Footer;
