import { useRouter } from 'next/router';
import { useState } from 'react';
import ReactSwitch from 'react-switch';
import useSWR from 'swr';
import NavbarElement from '../../components/Jobs/NavbarElement';
import Table from '../../components/Table';
import { fetcher } from '../../util/functions';

export default function Jobs() {
	const [selectedQuery, setSelectedQuery] = useState('onGoingJobs');
	const [isPopup, setIsPopup] = useState(false);
	const { data: jobs } = useSWR(`/api/jobs`, fetcher);
	const [firstName, setFirstName] = useState('');
	const [lastname, setLastname] = useState('');
	const [contactNumber, setContactNumber] = useState('');
	const [chasisNumber, setChasisNumber] = useState('');
	const [licensePlate, setLicensePlate] = useState('');
	const [brand, setBrand] = useState('');
	const [model, setModel] = useState('');
	const [motorType, setMotorType] = useState('');
	const [gearType, setGearType] = useState('');
	const [vehicleKm, setVehicleKm] = useState(0);
	const [isInsured, setIsInsured] = useState(false);
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
					{selectedQuery === 'onGoingJobs' && (
						<table className='divide-y-4 divide-slate-600 border-2 border-gray-700 w-full text-center'>
							<Table cols={['Customer ID', 'Name', 'Receipt ID', 'License Plate', 'Part Cost', 'Start Date']} rows={onGoingJobs} onClick={['receiptID']} />
						</table>
					)}
					{selectedQuery === 'finishedJobs' && (
						<table className='divide-y-4 divide-slate-600 border-2 border-gray-700 w-full text-center'>
							<Table
								onClick={['receiptID', 'summary']}
								cols={['Customer ID', 'Name', 'Receipt ID', 'License Plate', 'Total Cost (₺)', 'Total Time Spent (Days)', 'Start Date', 'End Date']}
								rows={finishedJobs}
							/>
						</table>
					)}
					{selectedQuery === 'newJob' && (
						<div className='grid grid-cols-4 gap-4 w-full'>
							<div>
								<div>{'First Name'}</div>
								<input
									className='newjob-input'
									autoComplete='new-password'
									type={'text'}
									maxLength={25}
									onChange={(e) => {
										setFirstName(e.target.value);
									}}></input>
							</div>
							<div>
								<div>{'Last Name'}</div>
								<input
									className='newjob-input'
									autoComplete='new-password'
									type={'text'}
									maxLength={25}
									onChange={(e) => {
										setLastname(e.target.value);
									}}></input>
							</div>
							<div>
								<div>{'Contact Number'}</div>
								<input
									className='newjob-input'
									autoComplete='new-password'
									type={'text'}
									maxLength={15}
									onChange={(e) => {
										setContactNumber(e.target.value);
									}}></input>
							</div>
							<div>
								<div>{'Chasis Number'}</div>
								<input
									className='newjob-input'
									autoComplete='new-password'
									type={'text'}
									maxLength={17}
									onChange={(e) => {
										setChasisNumber(e.target.value);
									}}></input>
							</div>
							<div>
								<div>{'License Plate'}</div>
								<input
									className='newjob-input'
									autoComplete='new-password'
									type={'text'}
									maxLength={7}
									onChange={(e) => {
										setLicensePlate(e.target.value);
									}}></input>
							</div>
							<div>
								<div>{'Brand'}</div>
								<input
									className='newjob-input'
									autoComplete='new-password'
									type={'text'}
									maxLength={20}
									onChange={(e) => {
										setBrand(e.target.value);
									}}></input>
							</div>
							<div>
								<div>{'Model'}</div>
								<input
									className='newjob-input'
									autoComplete='new-password'
									type={'text'}
									maxLength={20}
									onChange={(e) => {
										setModel(e.target.value);
									}}></input>
							</div>
							<div>
								<div>{'Motor Type'}</div>
								<input
									className='newjob-input'
									autoComplete='new-password'
									type={'text'}
									maxLength={1}
									onChange={(e) => {
										setMotorType(e.target.value);
									}}></input>
							</div>
							<div>
								<div>{'Gear Type'}</div>
								<input
									className='newjob-input'
									autoComplete='new-password'
									type={'text'}
									maxLength={1}
									onChange={(e) => {
										setGearType(e.target.value);
									}}></input>
							</div>
							<div>
								<div>{'Vehicle KM'}</div>
								<input
									className='newjob-input'
									autoComplete='new-password'
									type={'number'}
									maxLength={8}
									onChange={(e) => {
										setVehicleKm(parseInt(e.target.value));
									}}></input>
							</div>
							<div className='flex flex-col gap-2'>
								<div>{'Is Insured'}</div>
								<ReactSwitch
									checked={isInsured}
									onChange={() => {
										setIsInsured(!isInsured);
									}}
								/>
							</div>
							{firstName !== '' &&
								lastname !== '' &&
								contactNumber !== '' &&
								chasisNumber !== '' &&
								licensePlate !== '' &&
								brand !== '' &&
								model !== '' &&
								motorType !== '' &&
								gearType !== '' &&
								vehicleKm !== 0 && (
									<div
										className='bg-green-600 w-3/4 h-1/3 mt-1 text-white flex items-center justify-center rounded-md cursor-pointer transfrom duration-200 hover:bg-green-700'
										onClick={async () => {
											await commitJob(firstName, lastname, contactNumber, chasisNumber, licensePlate, brand, model, motorType, gearType, vehicleKm, isInsured);
											setIsPopup(true);
											setTimeout(() => {
												setIsPopup(false);
												setSelectedQuery('onGoingJobs');
											}, 1500);
										}}>
										Commit job
									</div>
								)}
							{isPopup && (
								<div className='absolute w-1/2 bottom-16'>
									<div className='w-full bg-slate-700 text-white rounded-md py-5 px-7'>{"Job commited. You're being redirected to job page."}</div>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</>
	);
}

async function commitJob(
	firstName: string,
	lastname: string,
	contactNumber: string,
	chasisNumber: string,
	licensePlate: string,
	brand: string,
	model: string,
	motorType: string,
	gearType: string,
	vehicleKm: number,
	isInsured: boolean
) {
	await fetch('/api/jobs/commit', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			firstName: firstName,
			lastname: lastname,
			contactNumber: contactNumber,
			chasisNumber: chasisNumber,
			licensePlate: licensePlate,
			brand: brand,
			model: model,
			motorType: motorType,
			gearType: gearType,
			vehicleKm: vehicleKm,
			isInsured: isInsured,
		}),
	});
}
