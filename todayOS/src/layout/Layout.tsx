export const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="w-full h-full font-sans text-base font-regular antialiased text-md-on-surface overflow-hidden fixed">
			{children}
		</div>
	)
}
