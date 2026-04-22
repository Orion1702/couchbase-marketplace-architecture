import { Request, Response } from 'express';
import { getCluster } from '../db';

export async function getProducts(_req: Request, res: Response) {
	try {
		const cluster = getCluster();
		const query = 'SELECT META(p).id AS id, p.* FROM `marketplace`.`store`.`products` AS p';
		const result = await cluster.query(query);

		res.json(result.rows);
	} catch (error) {
		console.error('Failed to fetch products:', error);
		res.status(500).json({ message: 'Failed to fetch products' });
	}
}
