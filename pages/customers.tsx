import { useState } from 'react';
import useSWR from 'swr';
import NavbarElement from '../components/Jobs/NavbarElement';
import Table from '../components/Table';
import { fetcher } from '../util/functions';

export default function customers() {
	const [selectedQuery, setSelectedQuery] = useState('premiumCustomers');
	const { data: premiumData } = useSWR(`/api/customers?type=premium`, fetcher);
	const { data: allData, error } = useSWR(`/api/customers?type=all`, fetcher);
	if (!premiumData) {
		return <></>;
	}
	if (!allData) {
		return <></>;
	}
	return (
		<div className='h-screen w-full flex flex-col items-center justify-center'>
			<div className='flex flex-row self-start gap-4' style={{ marginLeft: '14%' }}>
				<NavbarElement
					queryKey='premiumCustomers'
					text='Premium Customers'
					selectedQuery={selectedQuery}
					onClick={() => setSelectedQuery('premiumCustomers')}
				/>
				<NavbarElement queryKey='allCustomers' text='All Customers' selectedQuery={selectedQuery} onClick={() => setSelectedQuery('allCustomers')} />
			</div>

			<div className='h-3/4 w-3/4 rounded-md shadow-md bg-black bg-opacity-40 flex itmes-center justify-center p-36 flex-wrap overflow-auto'>
				<table className='divide-y-4 divide-slate-600 border-2 border-gray-700 w-full text-center'>
					{selectedQuery === 'premiumCustomers' && <Table cols={['ID', 'Name', 'Contact Number', 'Number of Visits', 'Rank']} rows={premiumData} />}
					{selectedQuery === 'allCustomers' && <Table cols={['ID', 'Name', 'Contact Number']} rows={allData} />}
				</table>
			</div>
		</div>
	);
}
