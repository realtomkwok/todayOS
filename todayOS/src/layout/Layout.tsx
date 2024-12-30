export const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="w-full h-full overflow-hidden font-sans text-base font-regular antialiased">
			{children}
		</div>
	)
}