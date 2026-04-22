import * as couchbase from 'couchbase';
import * as dotenv from 'dotenv';

dotenv.config();

const { CB_URL, CB_USERNAME, CB_PASSWORD, CB_BUCKET } = process.env;
let cluster: couchbase.Cluster | null = null;
let bucket: couchbase.Bucket | null = null;

export async function connectToDatabase() {
	try {
		cluster = await couchbase.connect(CB_URL!, {
			username: CB_USERNAME,
			password: CB_PASSWORD,
		});

		bucket = cluster.bucket(CB_BUCKET!);
		
		// Перевіримо з'єднання, отримавши інформацію про бакет
		console.log(`✅ Успішно підключено до Couchbase!`);
		console.log(`📦 Використовуємо бакет: ${CB_BUCKET}`);

		return { cluster, bucket };
	} catch (error) {
		console.error('❌ Помилка підключення до Couchbase:', error);
		process.exit(1);
	}
}

export function getCluster() {
	if (!cluster) {
		throw new Error('Couchbase cluster is not connected. Call connectToDatabase() first.');
	}

	return cluster;
}

export function getBucket() {
	if (!bucket) {
		throw new Error('Couchbase bucket is not connected. Call connectToDatabase() first.');
	}

	return bucket;
}