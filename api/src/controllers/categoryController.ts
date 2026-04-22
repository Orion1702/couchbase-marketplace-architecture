import { Request, Response } from 'express';
import { getCluster } from '../db';

export async function getCategories(_req: Request, res: Response) {
	try {
		const cluster = getCluster();
		const query = 'SELECT id, name, description FROM `marketplace`.`store`.`categories`';
		const result = await cluster.query(query);

		res.json(result.rows);
	} catch (error) {
		console.error('Failed to fetch categories:', error);
		res.status(500).json({ message: 'Failed to fetch categories' });
	}
}
