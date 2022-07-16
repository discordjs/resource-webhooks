import { Typography } from '@mui/material';
import RouterLink from '../components/RouterLink';

const NotFound = () => {
	return (
		<Typography variant="h1" align="center" sx={{ fontSize: '2em', display: 'grid', placeContent: 'center' }}>
			Woops, that route does not exist.
			<br />
			<br />
			<RouterLink to="/home">Go back to the home page</RouterLink>
		</Typography>
	);
};

export default NotFound;
