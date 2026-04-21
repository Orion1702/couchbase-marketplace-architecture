import * as couchbase from 'couchbase';
import * as dotenv from 'dotenv';

dotenv.config();

const { CB_URL, CB_USERNAME, CB_PASSWORD, CB_BUCKET } = process.env;

export async function connectToDatabase() {
	try {
		const cluster = await couchbase.connect(CB_URL!, {
		username: CB_USERNAME,
		password: CB_PASSWORD,
		});

		const bucket = cluster.bucket(CB_BUCKET!);
		
		// Перевіримо з'єднання, отримавши інформацію про бакет
		console.log(`✅ Успішно підключено до Couchbase!`);
		console.log(`📦 Використовуємо бакет: ${CB_BUCKET}`);

		return { cluster, bucket };
	} catch (error) {
		console.error('❌ Помилка підключення до Couchbase:', error);
		process.exit(1);
	}
}