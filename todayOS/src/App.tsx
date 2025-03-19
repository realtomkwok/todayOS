import "./App.css";
import "react-material-symbols/rounded";
import { Layout } from "@/layout/Layout";

import { Timeline } from "@components/timeline/Timeline";
import { Drawers } from "./components/drawers/Drawers";
import { ThemeManager } from "@utils/themeUtils.ts";

function App() {
	return (
		<Layout>
			<ThemeManager />
			<Timeline />
			<Drawers />
		</Layout>
	);
}

export default App;
