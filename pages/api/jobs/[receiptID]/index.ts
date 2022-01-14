import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	if (req.method === 'GET') {
		if (req.query.receiptID === 'undefined') return res.send({ loading: true });
		const resp = await fetch(`http://localhost:3000/jobs/${req.query.receiptID}`);
		const result = await resp.json();
		res.send(result);
	} else if (req.method === 'POST') {
		const resp = await fetch(`http://localhost:3000/jobs/${req.query.receiptID}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(req.body),
		});
		const result = await resp.json();
		res.send(result);
	}
}
