import type { Meta, StoryObj } from "@storybook/react";
import ImagePreview from "../components/shared/ImagePreview";

const meta: Meta<typeof ImagePreview> = {
	title: "Components/Shared/ImagePreview",
	component: ImagePreview,
};

export default meta;
type Story = StoryObj<typeof ImagePreview>;

export const Default: Story = {
	args: {
		src: "https://via.placeholder.com/150",
		alt: "Placeholder Image",
	},
};