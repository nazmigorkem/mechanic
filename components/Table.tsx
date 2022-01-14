import { useRouter } from 'next/router';

export default function Table({ cols, rows, onClick }: { cols: string[]; rows: any[]; onClick?: string[] }) {
	const router = useRouter();
	return (
		<>
			<thead>
				<tr>
					<ExtractColValues columns={cols} />
				</tr>
			</thead>

			<tbody className='divide-y divide-neutral-700'>
				<>
					{rows.map((x: { [key: string]: any }) => {
						return (
							<tr
								className={'hover:bg-gray-700 ' + (onClick ? 'cursor-pointer' : '')}
								onClick={() => {
									if (onClick) {
										let finalURL = '';
										for (let i = 0; i < onClick.length; i++) {
											const element = onClick[i];
											console.log(x[element]);
											finalURL += '/';
											finalURL += x[element] ?? element;
										}
										router.push(`/jobs${finalURL}`);
									}
								}}>
								<ExtractRowValues rowElement={x} />
							</tr>
						);
					})}
				</>
			</tbody>
		</>
	);
}

function ExtractRowValues({ rowElement }: { rowElement: { [key: string]: any } }) {
	const arr = [];
	for (const iterator of Object.keys(rowElement)) {
		arr.push(<td>{rowElement[iterator]}</td>);
	}
	return <>{arr}</>;
}

function ExtractColValues({ columns }: { columns: { [key: string]: any } }) {
	const arr = [];
	for (const iterator of Object.keys(columns)) {
		arr.push(<th>{columns[iterator]}</th>);
	}
	return <>{arr}</>;
}
