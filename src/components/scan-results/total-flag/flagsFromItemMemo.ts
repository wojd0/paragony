import { useMemo } from 'react';
import type { ReceiptItem } from '@/shared/types';

export const useFlagsFromItems = (items: ReceiptItem[]) =>
	useMemo<Record<string, number>>(() => {
		const result = items.reduce(
			(acc, item) => {
				if (item.selectedFlags.length === 0) {
					acc.unflaggedTotal += item.totalPrice;
				} else {
					item.selectedFlags.forEach((flag) => {
						acc.calculatedSelectedFlags[flag] =
							(acc.calculatedSelectedFlags[flag] || 0) +
							item.totalPrice / item.selectedFlags.length;
					});
				}
				return acc;
			},
			{
				calculatedSelectedFlags: {} as Record<string, number>,
				unflaggedTotal: 0,
			},
		);

		return {
			transparent: result.unflaggedTotal,
			...result.calculatedSelectedFlags,
		};
	}, [items]);
