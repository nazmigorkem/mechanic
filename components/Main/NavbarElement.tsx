import { useRouter } from 'next/router';

export default function NavbarElement({ text }: { text: string }) {
	const router = useRouter();
	return (
		<div
			onClick={() => {
				router.push('/' + text.toLowerCase());
			}}
			className={
				'text-white p-3 rounded-l-md hover:bg-body-bg transfrom duration-300 cursor-pointer ' +
				(router.pathname.endsWith(text.toLowerCase()) ? 'bg-body-bg' : 'bg-stone-700')
			}>
			{text}
		</div>
	);
}
