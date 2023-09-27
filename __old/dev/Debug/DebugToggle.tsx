"use client"

import { CodeBracketSquareIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import { useKeypress } from "~/hooks"
import { useDebugCtx } from "./DebugContext"

interface Props {
    
}


const DebugToggle: React.FC<Props> = ({}) => {
    const {modal} = useDebugCtx()

    useKeypress({
        meta: {
            "K": () => modal.toggle()
        }
    })

    return (
        <button className={clsx(
            `fixed bottom-2 left-2 z-999
            w-8 h-8 p-1 
            rounded-md
            bg-black text-white opacity-25
            transition-all duration-150
            hover:opacity-100`,
            modal.isOpen && "opacity-5"
        )}
        title="Devtools [cmd + K]"
        onClick={() => modal.open()}
        >
            <CodeBracketSquareIcon className=""/>
        </button>
    )
}


export default DebugToggle
