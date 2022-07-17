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
	{ primary: 'Update', secondary: 'Go here to update existing Webhook posts', to: '/update', toLabel: 'Update Post' }
];

const Home = () => {
	return (
		<Grid container justifyContent="center" alignContent="center" alignItems="center" spacing={4}>
			{cardData.map((card, index) => (
				<Grid item xs={12} sm={6} md={4} key={index}>
					<Card sx={{ maxWidth: 345, minHeight: 150, maxHeight: 150 }}>
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
