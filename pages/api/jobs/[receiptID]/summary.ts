import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	if (req.query.receiptID === 'undefined') return res.send({ loading: true });
	const resp = await fetch(`http://localhost:3000/jobs/${req.query.receiptID}/summary`);
	const result = await resp.json();
	res.send(result);
}
