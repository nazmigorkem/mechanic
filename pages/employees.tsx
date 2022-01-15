import { useState } from 'react';
import useSWR from 'swr';
import NavbarElement from '../components/Jobs/NavbarElement';
import Table from '../components/Table';
import { fetcher } from '../util/functions';

export default function Employees() {
	const [selectedQuery, setSelectedQuery] = useState('employees');
	const { data: employeesData, mutate } = useSWR(`/api/employees`, fetcher);
	if (!employeesData) {
		return <></>;
	}
	return (
		<div className='h-screen w-full flex flex-col items-center justify-center'>
			<div className='flex flex-row self-start gap-4' style={{ marginLeft: '14%' }}>
				<NavbarElement queryKey='employees' text='Employees' selectedQuery={selectedQuery} onClick={() => setSelectedQuery('employees')} />
			</div>

			<div className='h-3/4 w-3/4 rounded-md shadow-md bg-black bg-opacity-40 flex items-center p-24 flex-col overflow-auto'>
				<div
					className='bg-body-bg p-3 rounded-t-md ml-auto transfrom duration-200 hover:bg-slate-600 cursor-pointer text-white'
					onClick={async () => {
						await fetcher(`/api/employees/raise_salary`);
						await mutate();
					}}>
					{'Raise Salary'}
				</div>
				<table className='divide-y-4 divide-slate-600 border-2 border-gray-700 w-full text-center justify-self-center'>
					{selectedQuery === 'employees' && <Table cols={['SSN', 'Company ID', 'Role', 'Name', 'Age', 'Salary', 'Gender']} rows={employeesData} />}
				</table>
			</div>
		</div>
	);
}
