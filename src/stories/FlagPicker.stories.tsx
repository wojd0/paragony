import type { Meta, StoryObj } from "@storybook/react";
import FlagPicker from "../components/scan-results/receipt-list/flag-picker/FlagPicker";
import { AVAILABLE_FLAGS } from "../components/scan-results/receipt-list/flag-picker/types";

const meta: Meta<typeof FlagPicker> = {
	title: "Components/Scan Results/FlagPicker",
	component: FlagPicker,
};

export default meta;
type Story = StoryObj<typeof FlagPicker>;

export const Default: Story = {
	args: {
		flagIds: [AVAILABLE_FLAGS[0].id, AVAILABLE_FLAGS[2].id],
		flagChange: () => {},
		isOpen: false,
		openChange: () => {},
	},
};

export const PickerOpen: Story = {
	args: {
		...Default.args,
		isOpen: true,
	},
};

export const NoFlags: Story = {
	args: {
		...Default.args,
		flagIds: [],
	},
};