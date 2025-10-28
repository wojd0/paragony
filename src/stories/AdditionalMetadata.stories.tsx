import type { Meta, StoryObj } from "@storybook/react";
import AdditionalMetadata, {
	ReceiptMetadata,
} from "../components/scan-results/AdditionalMetadata";

const meta: Meta<typeof AdditionalMetadata> = {
	title: "Components/Scan Results/AdditionalMetadata",
	component: AdditionalMetadata,
};

export default meta;
type Story = StoryObj<typeof AdditionalMetadata>;

const mockMetadata: ReceiptMetadata = {
	"Total Amount": "123.45",
	Date: "2024-01-01",
	"Receipt Number": "123456789",
};

export const Default: Story = {
	args: {
		metadata: mockMetadata,
	},
};

export const Empty: Story = {
	args: {
		metadata: {},
	},
};