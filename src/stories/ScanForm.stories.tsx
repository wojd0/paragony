import type { Meta, StoryObj } from "@storybook/react";
import ScanForm from "../components/scan-results/ScanForm";

const meta: Meta<typeof ScanForm> = {
	title: "Components/Scan Results/ScanForm",
	component: ScanForm,
};

export default meta;
type Story = StoryObj<typeof ScanForm>;

export const Default: Story = {
	args: {
		onFileUploaded: (file: File) => {
			console.log("File uploaded:", file);
		},
	},
};

export const FileSelected: Story = {
	args: {
		onFileUploaded: (file: File) => {
			console.log("File uploaded:", file);
		},
	},
	// @ts-ignore
	parameters: {
		Mocks: {
			// @ts-ignore
			useState: (initial) => {
				if (initial === null) {
					return [
						new File([""], "example.jpg", { type: "image/jpeg" }),
						() => {},
					];
				}
				return [initial, () => {}];
			},
		},
	},
};