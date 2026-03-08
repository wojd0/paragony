import { useMemo } from "react";
import type { Receipt, ReceiptItem } from "./types";

export function useFlagsFromItems(items: ReceiptItem[]) {
  return useMemo<Record<string, number>>(() => {
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
      }
    );

    return {
      transparent: result.unflaggedTotal,
      ...result.calculatedSelectedFlags,
    };
  }, [items]);
}

export function removeFlagFromItems(flagId: string, receipt: Receipt) {
  return receipt.items.map((item) => {
    if (item.selectedFlags.includes(flagId)) {
      return {
        ...item,
        selectedFlags: item.selectedFlags.filter((id) => id !== flagId),
      };
    }
    return item;
  });
}
