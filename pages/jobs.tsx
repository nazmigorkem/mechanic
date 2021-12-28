import { useState } from 'react';
import NavbarElement from '../components/Jobs/NavbarElement';

export default function Jobs() {
	const [selectedQuery, setSelectedQuery] = useState('onGoingJobs');
	return (
		<>
			<div className='h-screen w-full flex flex-col items-center justify-center'>
				<div className='flex flex-row self-start gap-4' style={{ marginLeft: '14%' }}>
					<NavbarElement queryKey='onGoingJobs' text='On Going Jobs' selectedQuery={selectedQuery} onClick={() => setSelectedQuery('onGoingJobs')} />
					<NavbarElement queryKey='finishedJobs' text='Finished Jobs' selectedQuery={selectedQuery} onClick={() => setSelectedQuery('finishedJobs')} />
					<NavbarElement queryKey='newJob' text='New Job' selectedQuery={selectedQuery} onClick={() => setSelectedQuery('newJob')} />
				</div>
				<div className='h-3/4 w-3/4 rounded-md shadow-md bg-black bg-opacity-40 flex itmes-center justify-center gap-40 p-36 flex-wrap'></div>
			</div>
		</>
	);
}
