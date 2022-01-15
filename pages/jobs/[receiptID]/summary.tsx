import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';
import NavbarElement from '../../../components/Jobs/NavbarElement';
import { fetcher } from '../../../util/functions';

export default function Summary() {
	const [selectedQuery, setSelectedQuery] = useState('onGoingJobs');
	const router = useRouter();
	const { data: summary } = useSWR(`/api/jobs/${router.query.receiptID}/summary`, fetcher);

	if (!summary || summary.loading) {
		return <></>;
	}
	const { customerInfo, parts } = summary;
	return (
		<>
			<div className='h-screen w-full flex flex-col items-center justify-center'>
				<div className='flex flex-row self-start gap-4' style={{ marginLeft: '14%' }}>
					<NavbarElement
						queryKey='onGoingJobs'
						text={`${customerInfo.receiptID} - ${customerInfo['Customer Name']}`}
						selectedQuery={selectedQuery}
						onClick={() => setSelectedQuery('onGoingJobs')}
					/>
				</div>
				<div className='h-3/4 w-3/4 rounded-md shadow-md bg-black bg-opacity-40 flex itmes-center justify-center p-24 flex-wrap overflow-auto'>
					<div className='w-full p-5 bg-slate-800 bg-opacity-10 relative'>
						<div className='flex flex-col gap-y-4 h-full'>
							<div className='flex gap-3 flex-col h-full'>
								<div className='flex gap-3'>
									<span className='text-white'>{'Customer ID: '}</span>
									<span>{customerInfo['customerID']}</span>
								</div>
								<div className='flex gap-3'>
									<span className='text-white'>{'Customer Name: '}</span>
									<span>{customerInfo['Customer Name']}</span>
								</div>
								<div className='flex gap-3'>
									<span className='text-white'>{'Receipt ID: '}</span>
									<span>{customerInfo['receiptID']}</span>
								</div>
								<div className='flex gap-3'>
									<span className='text-white'>{'License Plate'}</span>
									<span>{customerInfo['licensePlate']}</span>
								</div>
								<div className='flex gap-3 mt-auto text-2xl'>
									{customerInfo['Discount Amount'] === 0 ? (
										<>
											<span className='text-white'>{'Total Cost '}</span>
											<span>{customerInfo['Total Cost'] + ' ₺'}</span>
										</>
									) : (
										<div className='flex flex-col gap-x-2'>
											<div>
												<span className='text-white'>{'Total Cost '}</span>
												<span className='line-through text-xl'>{customerInfo['Total Cost'] + ' ₺'}</span>
											</div>
											<div className='flex flex-row gap-x-2 items-end'>
												<span className='text-white'>{`Final Cost`}</span>
												<span className='text-xl'>{`${customerInfo['Final Cost']} ₺`}</span>
												<span className='text-green-500 text-sm'>{'-' + customerInfo['Discount Amount'] * 100 + '%'}</span>
											</div>
										</div>
									)}
								</div>
							</div>
							<div style={{ height: '85%' }} className='bg-body-bg mx-auto w-1/3 px-5 py-2 absolute right-24 overflow-y-auto space-y-3 flex flex-col'>
								{parts.map((x: any, i: number) => (
									<div key={i} className='flex flex-row gap-2 w-full self-center'>
										<span className='grow ml-3 flex flex-row h-full items-center gap-x-3' key={i}>
											<div className='text-white font-semibold '>{x.amount + 'x'}</div>
											<div>{x.brand + ' ' + x.partType}</div>
										</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
