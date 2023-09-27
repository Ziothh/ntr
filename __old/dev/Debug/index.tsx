// import DebugTheme from "~/features/dev/Debug/DebugTheme"
import { parseAppDir } from "~/server/common/appDir"
import type { AsyncFC } from "~/utils/nextjs"
import { DebugContextProvider } from "./DebugContext"
import DebugModal from "./DebugModal"
import DebugPageList from "./DebugPageList"
import DebugToggle from "./DebugToggle"
import { DebugReactQueryDevtoolsMenu, DebugReactQueryDevtoolsPanel } from "./DebugReactQueryDevtools"

interface Props {

}


const Debug: AsyncFC<Props> = async ({ }) => {
    // const pages = await getPageFiles
    const pages = await parseAppDir()

    // console.log();

    return (
        <DebugContextProvider>
            <DebugToggle />
            <DebugModal>
                <h1 className="text-2xl mb-4">Devtools modal</h1>
                <div className="flex flex-col gap-6">
                    <DebugPageList appDir={pages} />
                    {/* <DebugTheme /> */}
                    <DebugReactQueryDevtoolsMenu />
                </div>
            </DebugModal>

            <DebugReactQueryDevtoolsPanel />
        </DebugContextProvider>
    )
}


export default Debug
