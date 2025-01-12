import { BaseDrawer } from "./Base"

export const ClipboardDrawer = () => {
	return (
		<BaseDrawer data-oid="zpp55:a">
			<div className="w-full flex flex-col gap-4 items-center">
				<p className="text-md-on-surface-variant text-base font-sans font-medium tracking-normal">
					Clipboard
				</p>
				<div className="w-full flex flex-row flex-wrap gap-2">
					<div className="flex flex-row gap-2 bg-md-primary-container text-md-on-primary-container rounded-lg px-4 py-2 basis-1/2">
						<p className="text-xl font-medium">Take the bin out</p>
					</div>
					<div className="flex flex-row gap-2 bg-md-primary-container text-md-on-primary-container rounded-lg px-4 py-2 basis-1/2">
						<p className="text-xl font-medium">Take the bin out</p>
					</div>
					<div className="flex flex-row gap-2 bg-md-primary-container text-md-on-primary-container rounded-lg px-4 py-2 basis-1/2">
						<p className="text-xl font-medium">Take the bin out</p>
					</div>
					<div className="flex flex-row gap-2 bg-md-primary-container text-md-on-primary-container rounded-lg px-4 py-2 basis-1/2">
						<p className="text-xl font-medium">Take the bin out</p>
					</div>
				</div>
			</div>
		</BaseDrawer>
	)
}
