import type { Meta, StoryObj } from "@storybook/react";
import Navigation from "../components/navigation";

const meta: Meta<typeof Navigation> = {
	title: "Components/Navigation",
	component: Navigation,
};

export default meta;
type Story = StoryObj<typeof Navigation>;

export const Default: Story = {};