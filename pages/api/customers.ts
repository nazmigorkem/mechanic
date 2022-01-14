import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	const resp = await fetch(`http://localhost:3000/customers?type=${req.query.type}`);
	const result = await resp.json();
	res.send(result);
}
