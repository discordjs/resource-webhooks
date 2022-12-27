import { Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import RouterLink from '../components/RouterLink';

interface CardData {
	primary: string;
	secondary: string;
	to: string;
	toLabel: string;
}

const cardData: CardData[] = [
	{ primary: 'Post', secondary: 'Go here to create new Webhook posts', to: '/post', toLabel: 'Create Post' },
	{ primary: 'Update', secondary: 'Go here to update existing Webhook posts', to: '/update', toLabel: 'Update Post' },
	{ primary: 'Configure Webhooks', secondary: 'Go here to configure your stored webhooks', to: '/config/webhooks', toLabel: 'Configure Webhooks' },
	{ primary: 'Configure Roles', secondary: 'Go here to configure your stored roles', to: '/config/roles', toLabel: 'Configure Roles' }
];

const Home = () => {
	return (
		<Grid
			container
			justifyContent="center"
			alignContent="center"
			alignItems="center"
			spacing={4}
			sx={{
				mt: 1
			}}
		>
			{cardData.map((card, index) => (
				<Grid item xs={12} sm={6} md={6} key={index}>
					<Card sx={{ width: '100%', minHeight: 150, maxHeight: 150 }}>
						<CardContent>
							<Typography gutterBottom variant="h5" component="div">
								{card.primary}
							</Typography>
							<Typography variant="body2" color="text.secondary">
								{card.secondary}
							</Typography>
						</CardContent>
						<CardActions sx={{ pl: 2 }}>
							<RouterLink
								to={card.to}
								LinkProps={{
									underline: 'hover',
									sx: {
										color: 'text.primary'
									}
								}}
							>
								{card.toLabel}
							</RouterLink>
						</CardActions>
					</Card>
				</Grid>
			))}
		</Grid>
	);
};

export default Home;
