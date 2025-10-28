import type { Meta, StoryObj } from "@storybook/react";
import ReceiptListItem from "../components/scan-results/receipt-list/receipt-list-item/ReceiptListItem";
import { AVAILABLE_FLAGS } from "../components/scan-results/receipt-list/flag-picker/types";

const meta: Meta<typeof ReceiptListItem> = {
	title: "Components/Scan Results/ReceiptListItem",
	component: ReceiptListItem,
};

export default meta;
type Story = StoryObj<typeof ReceiptListItem>;

export const Default: Story = {
	args: {
		name: "Item 1",
		amount: 1,
		pricePerUnit: 10.0,
		reductionPerUnit: 0,
		totalPrice: 10.0,
		selectedFlags: [AVAILABLE_FLAGS[0].id],
		itemChanged: () => {},
		isPickerOpen: false,
		changePickerOpen: () => {},
	},
};

export const PickerOpen: Story = {
	args: {
		...Default.args,
		isPickerOpen: true,
	},
};