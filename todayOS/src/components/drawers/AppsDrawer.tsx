import { MaterialSymbol, SymbolCodepoints } from "react-material-symbols";
import { BaseDrawer } from "./Base";
import { motion, Variants } from "motion/react";
import { transition } from "../../utils/motionUtils";

interface IApp {
    icon: SymbolCodepoints
    name: string
}

export const AppIcon = (props: IApp) => {

    const appIconMotion: Variants = {
        initial: { scale: 1 },
        whileTap: { scale: 0.8, transition: transition.onScreen },
    }
        
    return (
        <motion.div
            className="w-16 h-16 flex flex-col items-center justify-center rounded-full bg-md-tertiary"
            variants={appIconMotion}
            initial="initial"
            whileTap="whileTap"
        >
            <MaterialSymbol icon={props.icon} fill size={24} className="text-md-on-tertiary" />
            {/* <span className="text-xs">{props.name}</span> */}
        </motion.div>
    )
}


export const AppsDrawer = () => {
    const apps: IApp[] = [
        { icon: "call", name: "Phone" },
        { icon: "forum", name: "Message" },
        { icon: "public", name: "Browser" },
        { icon: "apps", name: "Apps" },
    ]

    return (
        <BaseDrawer>
            {/* Dock */}
            <div className="flex flex-row justify-between">
                {apps.map((app) => (
                    <AppIcon icon={app.icon} name={app.name} />
                ))}
            </div>
        </BaseDrawer>
    )
}