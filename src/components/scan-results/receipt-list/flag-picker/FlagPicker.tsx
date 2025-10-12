import { useMemo } from "react";
import { Flag, AVAILABLE_FLAGS } from "./types";
import { MobileFlagRollout, MobileFlagToggler } from './MobileFlagPicker';

export interface FlagPickerProps {
	flagIds: string[];
	flagChange: (newFlags: Flag[]) => void;
	isOpen: boolean;
	openChange: (isOpen: boolean) => void;
}

export default function FlagPicker({
	flagIds,
	isOpen,
	openChange,
	flagChange,
}: FlagPickerProps) {
	const flags: Flag[] = useMemo(() => {
		return flagIds
			.map((flagId) => AVAILABLE_FLAGS.find((flag) => flag.id === flagId))
			.filter((flag) => !!flag);
	}, [flagIds]);

	const handleFlagSelect = (flagId: string) => {
		let newFlags = [...flags];
		if (newFlags.some((flag) => flag.id === flagId)) {
			newFlags = newFlags.filter((flag) => flag.id !== flagId);
		} else {
			const newFlag = AVAILABLE_FLAGS.find((flag) => flag.id === flagId);
			if (newFlags.length < 6 && newFlag) {
				newFlags.push(newFlag);
			}
		}
		flagChange(
			newFlags.sort((flagA, flagB) => (flagA.order > flagB.order ? 1 : -1)),
		);
	};

	return (
		<div className="flex items-center justify-end ml-3">
			<div className="md:hidden flex items-center justify-end">
				{isOpen && (
					<MobileFlagRollout
						selectedFlags={flags}
						handleFlagSelect={handleFlagSelect}
					/>
				)}
				<button
					className="btn btn-ghost p-0"
					onClick={() => openChange(!isOpen)}
				>
					<FlagBarGrid selectedFlags={flags} />
				</button>
			</div>
			<MobileFlagToggler
				selectedFlags={flags}
				handleFlagSelect={handleFlagSelect}
			/>
		</div>
	);
}

export interface FlagBar {
	selectedFlags: Flag[];
	handleFlagSelect: (flagId: string) => void;
}

interface FlagGridProps {
	selectedFlags: Flag[]; // Array of selected flag colors
}

export function FlagBarGrid({ selectedFlags }: FlagGridProps) {
	return (
		<div className="flex flex-row-reverse justify-end h-full">
			{AVAILABLE_FLAGS.map((availableFlag, index) => {
				const isSelected = selectedFlags.some(
					(selectedFlag) => selectedFlag.id === availableFlag.id,
				);
				return (
					<div
						key={index}
						className={`w-2 mx-[1px] xs:w-3 ${isSelected ? "" : "bg-base-200"}`}
						style={{
							backgroundColor: isSelected ? availableFlag.color : undefined,
						}}
					/>
				);
			})}
		</div>
	);
}
