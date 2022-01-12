import { MouseEventHandler } from 'react';

export default function NavbarElement({
	text,
	queryKey,
	selectedQuery,
	onClick,
}: {
	text: string;
	queryKey: string;
	selectedQuery: string;
	onClick: MouseEventHandler<HTMLDivElement>;
}) {
	return (
		<div
			onClick={onClick}
			className={
				'py-5 px-3 text-white rounded-t-md w-48 text-center select-none transform duration-300' +
				(selectedQuery === queryKey ? ' bg-black bg-opacity-40 ' : ' bg-stone-700 cursor-pointer hover:bg-black hover:bg-opacity-40')
			}>
			{text}
		</div>
	);
}
