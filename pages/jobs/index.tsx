import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';
import NavbarElement from '../../components/Jobs/NavbarElement';
import Table from '../../components/Table';
import { fetcher } from '../../util/functions';

export default function Jobs() {
	const [selectedQuery, setSelectedQuery] = useState('onGoingJobs');
	const { data: jobs } = useSWR(`/api/jobs`, fetcher);
	const router = useRouter();
	if (!jobs) {
		return <></>;
	}
	const onGoingJobs = jobs.onGoingJobs;
	const finishedJobs = jobs.finishedJobs;
	return (
		<>
			<div className='h-screen w-full flex flex-col items-center justify-center'>
				<div className='flex flex-row self-start gap-4' style={{ marginLeft: '14%' }}>
					<NavbarElement queryKey='onGoingJobs' text='On Going Jobs' selectedQuery={selectedQuery} onClick={() => setSelectedQuery('onGoingJobs')} />
					<NavbarElement queryKey='finishedJobs' text='Finished Jobs' selectedQuery={selectedQuery} onClick={() => setSelectedQuery('finishedJobs')} />
					<NavbarElement queryKey='newJob' text='New Job' selectedQuery={selectedQuery} onClick={() => setSelectedQuery('newJob')} />
				</div>
				<div className='h-3/4 w-3/4 rounded-md shadow-md bg-black bg-opacity-40 flex itmes-center justify-center p-24 flex-wrap overflow-auto'>
					<table className='divide-y-4 divide-slate-600 border-2 border-gray-700 w-full text-center'>
						{selectedQuery === 'onGoingJobs' && (
							<Table cols={['Customer ID', 'Name', 'Receipt ID', 'License Plate', 'Part Cost', 'Start Date']} rows={onGoingJobs} onClick={'receiptID'} />
						)}
						{selectedQuery === 'finishedJobs' && (
							<Table cols={['Customer ID', 'Name', 'Receipt ID', 'License Plate', 'Total Cost (₺)', 'Total Time Spent (Days)', 'Start Date', 'End Date']} rows={finishedJobs}/>
						)}
					</table>
				</div>
			</div>
		</>
	);
}
