import { HomeIcon, UserIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

export default function Navigation() {
	return (
		<nav className='navbar bg-base-100 shadow-sm'>
			<div className='navbar-start'>
				<Link href='/'>
					<button
						type='button'
						className='btn btn-ghost btn-circle text-base-content hover:bg-base-200'
					>
						<HomeIcon width={25} height={25} />
					</button>
				</Link>
				<Link
					href='/receipts'
					className='btn btn-ghost normal-case text-lg text-base-content hover:bg-base-200'
				>
					My Receipts
				</Link>
				<Link
					href='/scan'
					className='btn btn-ghost normal-case text-lg text-base-content hover:bg-base-200'
				>
					Scan
				</Link>
			</div>
			<div className='navbar-end'>
				<button
					type='button'
					className='btn btn-ghost btn-circle text-base-content hover:bg-base-200'
				>
					<UserIcon width={25} height={25} />
				</button>
			</div>
		</nav>
	);
}
