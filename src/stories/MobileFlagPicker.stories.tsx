import type { Meta, StoryObj } from "@storybook/react";
import {
	MobileFlagToggler,
	MobileFlagRollout,
} from "../components/scan-results/receipt-list/flag-picker/MobileFlagPicker";
import { AVAILABLE_FLAGS } from "../components/scan-results/receipt-list/flag-picker/types";

const meta: Meta<typeof MobileFlagToggler> = {
	title: "Components/Scan Results/MobileFlagPicker",
	component: MobileFlagToggler,
};

export default meta;
type Story = StoryObj<typeof MobileFlagToggler>;

export const Toggler: Story = {
	args: {
		selectedFlags: [AVAILABLE_FLAGS[0], AVAILABLE_FLAGS[2]],
		handleFlagSelect: () => {},
	},
};

export const Rollout: Story = {
	render: (args) => <MobileFlagRollout {...args} />,
	args: {
		selectedFlags: [AVAILABLE_FLAGS[1], AVAILABLE_FLAGS[3]],
		handleFlagSelect: () => {},
	},
};