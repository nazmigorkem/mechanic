import { useState } from 'react';
import useSWR from 'swr';
import NavbarElement from '../components/Jobs/NavbarElement';
import Table from '../components/Table';
import { fetcher } from '../util/functions';

export default function Suppliers() {
	const [selectedQuery, setSelectedQuery] = useState('suppliers');
	const { data: suppliersData } = useSWR(`/api/suppliers`, fetcher);
	if (!suppliersData) {
		return <></>;
	}
	const { suppliers } = suppliersData;
	return (
		<div className='h-screen w-full flex flex-col items-center justify-center'>
			<div className='flex flex-row self-start gap-4' style={{ marginLeft: '14%' }}>
				<NavbarElement queryKey='suppliers' text='Suppliers' selectedQuery={selectedQuery} onClick={() => setSelectedQuery('suppliers')} />
			</div>

			<div className='h-3/4 w-3/4 rounded-md shadow-md bg-black bg-opacity-40 flex itmes-center justify-center p-24 flex-wrap overflow-auto'>
				<table className='divide-y-4 divide-slate-600 border-2 border-gray-700 w-full text-center'>
					{selectedQuery === 'suppliers' && <Table cols={['Supplier ID', 'City', 'Postal Code', 'Tax Number']} rows={suppliers} />}
				</table>
			</div>
		</div>
	);
}
