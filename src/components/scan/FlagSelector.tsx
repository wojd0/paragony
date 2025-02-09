import { FlagIcon as FlagIconOutline } from "@heroicons/react/24/outline";
import { FlagIcon as FlagIconSolid } from "@heroicons/react/24/solid";

export default function FlagSelector({
  flags = ["white"],
  selectedFlags = [],
  onFlagsChanged,
}: {
  flags?: string[];
  selectedFlags?: string[];
  onFlagsChanged: (flags: string[]) => void;
}) {
  return (
    <div className="overflow-visible flex gap-1">
      {flags.map((flag, index) => (
        <button
          key={index}
          className="btn-square rounded-lg w-8 h-8 p-1 bg-base-200"
          onClick={() =>
            onFlagsChanged(
              selectedFlags.includes(flag)
                ? selectedFlags.filter((f) => f !== flag)
                : [...selectedFlags, flag],
            )
          }
        >
          {selectedFlags.includes(flag) ? (
            <FlagIconSolid className="w-6" fill={flag} />
          ) : (
            <FlagIconOutline className="w-6" color={flag} />
          )}
        </button>
      ))}
      <button className="btn-square rounded-lg w-8 h-8 p-1 bg-base-200"></button>
    </div>
  );
}
