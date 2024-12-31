import "./App.css"
import "react-material-symbols/rounded"
import { Layout } from "@/layout/Layout"

import { AppsDrawer } from "@components/drawers/AppsDrawer"
import { Timeline } from "@components/timeline/Base"

function App() {
	return (
		<Layout>
			<Timeline />
			<AppsDrawer />
		</Layout>
	)
}

export default App
