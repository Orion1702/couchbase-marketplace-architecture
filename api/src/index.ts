import { connectToDatabase } from './db';

async function main() {
	await connectToDatabase();
	console.log('🚀 API готове до роботи!');
}

main();