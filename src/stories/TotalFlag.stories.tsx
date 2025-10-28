import type { Meta, StoryObj } from "@storybook/react";
import TotalFlag from "../components/scan-results/receipt-list/total-flag-panel/TotalFlag";
import { AVAILABLE_FLAGS } from "../components/scan-results/receipt-list/flag-picker/types";

const meta: Meta<typeof TotalFlag> = {
	title: "Components/Scan Results/TotalFlag",
	component: TotalFlag,
};

export default meta;
type Story = StoryObj<typeof TotalFlag>;

export const Default: Story = {
	args: {
		flagId: AVAILABLE_FLAGS[0].id,
		total: 123.45,
		onRemove: () => {},
	},
};

export const Removable: Story = {
	args: {
		...Default.args,
		flagId: AVAILABLE_FLAGS[1].id,
	},
};