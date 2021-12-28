import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NavbarElement from '../components/Main/NavbarElement';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<div className='flex flex-col absolute gap-y-3 h-screen pt-24 w-52 bg-black bg-opacity-40 mr-0 pl-5'>
				<NavbarElement text='Jobs' />
				<NavbarElement text='Employees' />
				<NavbarElement text='Suppliers' />
			</div>
			<div className='ml-52'>
				<Component {...pageProps} />
			</div>
		</>
	);
}

export default MyApp;
