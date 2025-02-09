import { PlusIcon, TrashIcon } from "@heroicons/react/16/solid";
import { FlagIcon } from "@heroicons/react/16/solid";

export type ItemFlags = Record<string, number>;

export default function FlagPanel({ flags = {} }: { flags?: ItemFlags }) {
  return (
    <div className="card bg-base-200 w-full h-24">
      <div className="card-content p-3 h-full">
        {Object.entries(flags).map(([color, total]) => (
          <button
            key={color}
            className="btn pr-12 btn-ghost h-full whitespace-nowrap relative group"
          >
            <FlagIcon className={`w-6`} fill={color} />

            <span className="text-left">
              <small>Total:</small>
              <br />
              <span className="text-lg">{total} PLN</span>
            </span>

            <div className="opacity-0 group-hover:opacity-100 btn-circle h-6 w-6 p-1 absolute top-1 right-1 bg-red-600">
              <TrashIcon />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
