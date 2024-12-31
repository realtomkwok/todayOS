export const Now = (props: { time: string, period: string } & React.HTMLAttributes<HTMLDivElement>) => {

    return (
		<div className={`relative w-full h-fit px-4 ${props.className}`}>
			<div className="flex justify-left items-center w-full h-fit gap-4">
				<div className="w-2 h-2 bg-md-error rounded-full" />
				<div className="flex justify-center items-start gap-2 z-50">
                    <span
                        className="text-md-on-surface text-8xl font-display font-extrabold tracking-normal"
                        style={{ fontVariationSettings: `'opsz' 96, 'wdth' 75` }}>
						{props.time}
                    </span>
                    <span
                        className="text-md-on-surface-variant text-xl font-display font-semibold tracking-normal"
                        style={{ fontVariationSettings: `'opsz' 24, 'wdth' 90` }}>
                        {props.period}
                    </span>
				</div>
				<div className="absolute w-full h-0 left-0 border border-md-error" />
			</div>
		</div>
	)
}