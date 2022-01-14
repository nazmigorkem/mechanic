import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useState } from 'react';
import useSWR from 'swr';
import NavbarElement from '../../components/Jobs/NavbarElement';
import { fetcher } from '../../util/functions';

export default function Jobs() {
	const [selectedQuery, setSelectedQuery] = useState('onGoingJobs');
	const router = useRouter();
	const { data: onGoingJobs } = useSWR(`/api/jobs/${router.query.receiptID}`, fetcher);
	const { data: customerParts, mutate: mutateCustomerParts } = useSWR(`/api/parts/${router.query.receiptID}`, fetcher);
	const { data: allParts, mutate: mutateAllParts } = useSWR(`/api/parts`, fetcher);
	const [brand, setBrand] = useState('none');
	const [part, setPart] = useState('none');
	const [partIndex, setPartIndex] = useState(-1);
	const [quantity, setQuantity] = useState(1);
	if (!onGoingJobs || !customerParts || !allParts || onGoingJobs.loading || customerParts.loading) {
		return <></>;
	}

	return (
		<>
			<div className='h-screen w-full flex flex-col items-center justify-center'>
				<div className='flex flex-row self-start gap-4' style={{ marginLeft: '14%' }}>
					<NavbarElement
						queryKey='onGoingJobs'
						text={`${onGoingJobs[0].receiptID} - ${onGoingJobs[0]['Customer Name']}`}
						selectedQuery={selectedQuery}
						onClick={() => setSelectedQuery('onGoingJobs')}
					/>
				</div>
				<div className='h-3/4 w-3/4 rounded-md shadow-md bg-black bg-opacity-40 flex itmes-center justify-center p-24 flex-wrap overflow-auto'>
					<div className='w-full p-5 bg-slate-800 bg-opacity-10 relative'>
						<div className='flex flex-col gap-y-4'>
							<div className='flex gap-3 flex-col'>
								<div className='flex gap-3'>
									<span className='text-white'>{'Customer ID: '}</span>
									<span>{onGoingJobs[0]['customerID']}</span>
								</div>
								<div className='flex gap-3'>
									<span className='text-white'>{'Customer Name: '}</span>
									<span>{onGoingJobs[0]['Customer Name']}</span>
								</div>
								<div className='flex gap-3'>
									<span className='text-white'>{'Receipt ID: '}</span>
									<span>{onGoingJobs[0]['receiptID']}</span>
								</div>
								<div className='flex gap-3'>
									<span className='text-white'>{'License Plate'}</span>
									<span>{onGoingJobs[0]['licensePlate']}</span>
								</div>
							</div>
							<div style={{ height: '85%' }} className='bg-body-bg mx-auto w-1/3 px-5 py-2 absolute right-24 overflow-y-auto space-y-3 flex flex-col'>
								{customerParts.map((x: any, i: number) => (
									<div className='flex flex-row gap-2 justify-between w-10/12 self-center'>
										<span
											onClick={async () => {
												const part = allParts[x.brand].find((y: any) => y.partType === x.partType);
												await sendResults(router.query.receiptID as string, { data: part, quantity: -1 });
												mutateAllParts();
												mutateCustomerParts();
											}}
											className='bg-red-600 px-3 rounded-lg font-bold text-white cursor-pointer select-none my-auto'>
											{'<'}
										</span>
										<span className='grow ml-3 flex flex-row h-full  items-center gap-x-3' key={i}>
											<div className='text-white font-semibold '>{x.amount + 'x'}</div>
											<div>{x.brand + ' ' + x.partType}</div>
										</span>
										<span
											onClick={async () => {
												const part = allParts[x.brand].find((y: any) => y.partType === x.partType);
												await sendResults(router.query.receiptID as string, { data: part, quantity: +1 });
												mutateAllParts();
												mutateCustomerParts();
											}}
											className='bg-green-600 px-3 rounded-lg font-bold text-white cursor-pointer select-none my-auto'>
											{'>'}
										</span>
										<br />
									</div>
								))}
							</div>
							<div className='flex flex-col p-7 gap-3'>
								<span className='font-semibold text-white text-xl'>Add parts</span>
								<hr className='w-28' />
								<div className='flex flex-row items-stretch gap-3'>
									<Brands setQuantity={setQuantity} brands={allParts} setPartIndex={setPartIndex} selectedBrand={brand} setPart={setPart} setBrand={setBrand} />
									{brand !== 'none' && <Parts setPartIndex={setPartIndex} brands={allParts} selectedBrand={brand} selectedPart={part} setPart={setPart} />}
									{brand !== 'none' && part !== 'none' && (
										<>
											<input
												type='number'
												onInput={(e) => {
													const val = parseInt(e.currentTarget.value);
													if (val > 20) {
														setQuantity(20);
													} else if (val < 1) {
														setQuantity(1);
													}
													setQuantity(val);
												}}
												max={'20'}
												min={'1'}
												defaultValue={1}
												className='bg-body-bg outline-none px-5 w-20 h-12 rounded-md'
											/>
											<input type='button' />
											<div
												className='p-2 rounded-md w-20 h-12 text-white flex items-center justify-center select-none hover:bg-green-700 transform duration-200 cursor-pointer bg-green-600'
												onClick={async () => {
													const part = allParts[brand][partIndex];
													await sendResults(router.query.receiptID as string, { data: part, quantity: quantity });
													mutateAllParts();
													mutateCustomerParts();
												}}>
												Add
											</div>
										</>
									)}
								</div>
							</div>
							<div className='absolute bottom-5 p-5 bg-red-600 rounded-md text-white font-semibold hover:bg-red-700 transform duration-200 cursor-pointer select-none'>
								Finish the job
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

function Parts({
	brands,
	selectedBrand,
	selectedPart,
	setPart,
	setPartIndex,
}: {
	brands: { [key: string]: any };
	selectedBrand: string;
	selectedPart: string;
	setPart: Dispatch<SetStateAction<string>>;
	setPartIndex: Dispatch<SetStateAction<number>>;
}) {
	const partArr = [];
	const [partSelection, setPartSelection] = useState(false);
	let i = 0;
	for (const iterator of Object.keys(brands[selectedBrand] ?? {})) {
		i++;
		partArr.push(
			<div
				key={i}
				className='hover:bg-gray-700 transform duration-200 p-3 cursor-pointer'
				onClick={() => {
					setPart(brands[selectedBrand][iterator].partType + ' - ' + brands[selectedBrand][iterator].price + '₺');
					setPartIndex(parseInt(iterator));
					setPartSelection(false);
				}}>
				{brands[selectedBrand][iterator].partType + ' - ' + brands[selectedBrand][iterator].price + '₺'}
			</div>
		);
	}
	return (
		<>
			<div className='w-1/6 select-none'>
				<div
					className={
						' cursor-pointer p-3 text-white bg-body-bg' +
						(selectedPart === 'none' ? ' text-opacity-25' : '') +
						(partSelection ? ' rounded-t-md' : ' rounded-md')
					}
					onClick={() => {
						setPartSelection(!partSelection);
					}}>
					{selectedPart === 'none' ? 'Select Part' : selectedPart}
				</div>
				{partSelection && <div className='flex flex-col bg-gray-800 text-white rounded-b-md overflow-auto h-32'>{partArr}</div>}
			</div>
		</>
	);
}

function Brands({
	brands,
	selectedBrand,
	setBrand,
	setPart,
	setPartIndex,
	setQuantity,
}: {
	brands: { [key: string]: any };
	selectedBrand: string;
	setBrand: Dispatch<SetStateAction<string>>;
	setPart: Dispatch<SetStateAction<string>>;
	setPartIndex: Dispatch<SetStateAction<number>>;
	setQuantity: Dispatch<SetStateAction<number>>;
}) {
	const brandArr = [];
	const [brandSelection, setBrandSelection] = useState(false);
	let i = 0;
	for (const iterator of Object.keys(brands)) {
		i++;
		brandArr.push(
			<div
				key={i}
				className='hover:bg-gray-700 transform duration-200 p-3 cursor-pointer'
				onClick={() => {
					setBrand(iterator);
					setBrandSelection(false);
					if (iterator !== selectedBrand) {
						setPart('none');
						setPartIndex(-1);
						setQuantity(1);
					}
				}}>
				{iterator}
			</div>
		);
	}
	return (
		<>
			<div className='w-1/6 select-none'>
				<div
					className={
						' cursor-pointer p-3 text-white bg-body-bg' +
						(selectedBrand === 'none' ? ' text-opacity-25' : '') +
						(brandSelection ? ' rounded-t-md' : ' rounded-md')
					}
					onClick={() => {
						setBrandSelection(!brandSelection);
					}}>
					{selectedBrand === 'none' ? 'Select brand' : selectedBrand}
				</div>
				{brandSelection && <div className='flex flex-col bg-gray-800 text-white rounded-b-md overflow-auto h-32'>{brandArr}</div>}
			</div>
		</>
	);
}

async function sendResults(id: string, results: object) {
	const res = await fetcher(`/api/jobs/${id}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(results),
	});
}
