import type { Meta, StoryObj } from "@storybook/react";
import ClipboardToast from "../components/shared/ClipboardToast";

const meta: Meta<typeof ClipboardToast> = {
	title: "Components/Shared/ClipboardToast",
	component: ClipboardToast,
};

export default meta;
type Story = StoryObj<typeof ClipboardToast>;

export const Visible: Story = {
	args: {
		visible: true,
	},
};

export const Hidden: Story = {
	args: {
		visible: false,
	},
};