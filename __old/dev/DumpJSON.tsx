import clsx from "clsx"
import type { FC, ReactNode } from "react"
import superjson from "superjson"

interface Props {
    json: any
    withBorder?: boolean
    withMargin?: boolean
    label?: ReactNode
}


/** It converts the json to string with the `superjson` library and renders it inside of a <pre> tag */
const DumpJSON: FC<Props> = ({
    json, 
    withBorder = true, 
    withMargin = false,
    label
}) => {
    return (
        <pre className={clsx(withBorder && "p-4 overflow-auto border rounded-md", withMargin && "m-4")}>
            {label && <div>{label}</div>}
            {JSON.stringify(superjson.serialize(json).json, null, 4)}
        </pre>
    )
}


export default DumpJSON
