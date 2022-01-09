export default function Table({ cols, rows }: { cols: string[]; rows: any[] }) {
	return (
		<>
			<thead>
				<tr>
					<ExtractColValues columns={cols} />
				</tr>
			</thead>

			<tbody className='divide-y divide-neutral-700'>
				<>
					{rows.map((x: any) => {
						return (
							<tr className='hover:bg-gray-700'>
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
