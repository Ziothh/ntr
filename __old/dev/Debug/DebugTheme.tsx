"use client"

import BaseLightSwitch from "~/features/form/fields/base/LightSwitch.base"
import { useThemeCtx } from "~/features/theme/theme.context"


interface Props {
}


const DebugTheme: React.FC<Props> = ({
}) => {
    const {theme, setTheme} = useThemeCtx()

    return (
        <div className="max-h-full h-full overflow-hidden">
            <h2 className="text-xl mb-4">Theme</h2>

            <BaseLightSwitch
            name="darkMode"
            value={theme === "dark"}
            onChange={() => setTheme(prev => prev === "dark" ? "light" : "dark")}
            label={`Dark mode is ${theme === "dark" ? "" : "in"}active.`}
            />
        </div>
    )
}


export default DebugTheme