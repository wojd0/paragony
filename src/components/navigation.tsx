import { HomeIcon, UserIcon } from '@heroicons/react/20/solid';

export default function Navigation() {
    return (
        <nav className="navbar bg-base-100">
            <div className="navbar-start">
                <button className="btn btn-ghost btn-circle">
                    <HomeIcon className="h-5 w-5" />
                </button>
                <a className="btn btn-ghost normal-case text-xl">My Receipts</a>
            </div>
            <div className="navbar-end">
                <button className="btn btn-ghost btn-circle">
                    <UserIcon className="h-5 w-5" />
                </button>
            </div>
        </nav>
    );
};