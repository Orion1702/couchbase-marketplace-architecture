import express from 'express';
import cors from 'cors';
import { connectToDatabase, getCluster } from './db';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(
	cors({
		origin: 'http://localhost:5173',
	})
);
app.use(express.json());

app.get('/api/products', async (_req, res) => {
	try {
		const cluster = getCluster();
		const query = 'SELECT META(p).id AS id, p.* FROM `marketplace`.`store`.`products` AS p';
		const result = await cluster.query(query);

		res.json(result.rows);
	} catch (error) {
		console.error('Failed to fetch products:', error);
		res.status(500).json({ message: 'Failed to fetch products' });
	}
});

async function main() {
	await connectToDatabase();
	app.listen(PORT, () => {
		console.log(`🚀 API готове до роботи! Listening on port ${PORT}`);
	});
}

main().catch((error) => {
	console.error('API startup failed:', error);
	process.exit(1);
});