import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './db';
import productRoutes from './routes/productRoutes';
import categoryRoutes from './routes/categoryRoutes';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(
	cors({
		origin: 'http://localhost:5173',
	})
);
app.use(express.json());
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);

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