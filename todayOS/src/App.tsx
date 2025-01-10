import "./App.css"
import "react-material-symbols/rounded"
import { Layout } from "@/layout/Layout"

import { Timeline } from "@components/timeline/Timeline"
import { Drawers } from "./components/drawers/Drawers"

function App() {
	return (
		<Layout>
			<Timeline />
			<Drawers />
		</Layout>
	)
}

export default App
