import { FlagIcon as FlagIconSolid } from '@heroicons/react/16/solid';
import { FlagIcon as FlagIconOutline } from '@heroicons/react/24/outline';
import type { Flag } from '@/shared/types';
import { AVAILABLE_FLAGS } from '../../constants';
import type { FlagBar } from './FlagPicker';

interface FlagIconToggleProps {
	flag: Flag;
	isSelected: boolean;
	sizeClass: string;
}

function FlagIconToggle({ flag, isSelected, sizeClass }: FlagIconToggleProps) {
	return isSelected ? (
		<FlagIconSolid className={sizeClass} style={{ color: flag.color }} />
	) : (
		<FlagIconOutline className={sizeClass} style={{ color: flag.color }} />
	);
}

export function MobileFlagToggler({
	selectedFlags,
	handleFlagSelect,
}: FlagBar) {
	return (
		<div className='hidden md:flex flex-row-reverse items-center gap-1'>
			{AVAILABLE_FLAGS.map((flag: Flag) => (
				<button
					type='button'
					key={flag.id}
					className='btn btn-ghost p-0'
					onClick={() => handleFlagSelect(flag.id)}
				>
					<FlagIconToggle
						flag={flag}
						isSelected={selectedFlags.some(
							(selectedFlag) => selectedFlag.id === flag.id,
						)}
						sizeClass={'w-6 h-6'}
					/>
				</button>
			))}
		</div>
	);
}

export function MobileFlagRollout({
	selectedFlags,
	handleFlagSelect,
}: FlagBar) {
	const maxWidth = AVAILABLE_FLAGS.length;

	return (
		<ul
			className={`flex flex-row-reverse justify-between grow max-w-full md:max-w-1/2`}
			style={{ maxWidth: `calc(${maxWidth} * var(--spacing))` }}
		>
			{AVAILABLE_FLAGS.map((flag: Flag) => (
				<li key={flag.id}>
					<button
						type='button'
						className='p-2 bg-base-100'
						onClick={() => handleFlagSelect(flag.id)}
					>
						<FlagIconToggle
							flag={flag}
							isSelected={selectedFlags.some(
								(selectedFlag) => selectedFlag.id === flag.id,
							)}
							sizeClass={'w-5 h-5'}
						/>
					</button>
				</li>
			))}
		</ul>
	);
}
