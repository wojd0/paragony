import { redirect } from "next/navigation";

export default function Home() {
	// return <Hero />;
	redirect("/scan");
}
