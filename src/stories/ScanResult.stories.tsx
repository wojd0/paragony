import type { Meta, StoryObj } from "@storybook/react";
import ScanResult from "../components/scan-results/ScanResult";
import { Receipt } from "../components/scan-results/receipt-list/receipt-list.types";

const meta: Meta<typeof ScanResult> = {
	title: "Components/Scan Results/ScanResult",
	component: ScanResult,
};

export default meta;
type Story = StoryObj<typeof ScanResult>;

const mockReceipt: Receipt = {
	items: [
		{
			name: "Product 1",
			price: 10.99,
			quantity: 2,
		},
		{
			name: "Product 2",
			price: 5.49,
			quantity: 1,
		},
	],
	metadata: {
		"Total Amount": "27.47",
		Date: "2024-01-01",
		"Receipt Number": "123456789",
	},
	total: 27.47,
};

const mockImageFile = new File([""], "receipt.jpg", { type: "image/jpeg" });

export const Default: Story = {
	args: {
		receiptImage: mockImageFile,
		receipt: mockReceipt,
		onReceiptChange: (receipt: Receipt) => {
			console.log("Receipt changed:", receipt);
		},
	},
};