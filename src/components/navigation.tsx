import { HomeIcon, UserIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

export default function Navigation() {
   return (
      <nav className="navbar bg-base-100">
         <div className="navbar-start">
            <Link href="/">
               <button className="btn btn-ghost btn-circle">
                  <HomeIcon className="h-5 w-5" />
               </button>
            </Link>
            <Link
               href="/receipts"
               className="btn btn-ghost normal-case text-xl"
            >
               My Receipts
            </Link>
            <Link href="scan" className="btn btn-ghost normal-case text-xl">
               Scan tmpstuff
            </Link>
         </div>
         <div className="navbar-end">
            <button className="btn btn-ghost btn-circle">
               <UserIcon className="h-5 w-5" />
            </button>
         </div>
      </nav>
   );
}
