import { Request, Response } from 'express';
import { getCluster } from '../db';

export async function getUsers(_req: Request, res: Response) {
	try {
		const cluster = getCluster();
		const query = 'SELECT META(u).id AS id, u.* FROM `marketplace`.`store`.`users` AS u';
		const result = await cluster.query(query);

		res.json(result.rows);
	} catch (error) {
		console.error('Failed to fetch users:', error);
		res.status(500).json({ message: 'Failed to fetch users' });
	}
}
