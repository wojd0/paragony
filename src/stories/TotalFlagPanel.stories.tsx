import type { Meta, StoryObj } from "@storybook/react";
import TotalFlagPanel from "../components/scan-results/receipt-list/total-flag-panel/TotalFlagPanel";
import { AVAILABLE_FLAGS } from "../components/scan-results/receipt-list/flag-picker/types";

const meta: Meta<typeof TotalFlagPanel> = {
	title: "Components/Scan Results/TotalFlagPanel",
	component: TotalFlagPanel,
};

export default meta;
type Story = StoryObj<typeof TotalFlagPanel>;

export const Default: Story = {
	args: {
		flags: {
			[AVAILABLE_FLAGS[0].id]: 123.45,
			[AVAILABLE_FLAGS[1].id]: 67.89,
		},
		onFlagChange: () => {},
	},
};

export const Empty: Story = {
	args: {
		flags: {},
		onFlagChange: () => {},
	},
};