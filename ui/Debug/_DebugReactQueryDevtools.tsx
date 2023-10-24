"use client"

import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools"
import { FC, useEffect, useId, useState } from "react"
import { createPortal } from "react-dom"
import BaseLightSwitch from "~/features/form/fields/base/LightSwitch.base"
import { useDebugCtx } from "./DebugContext"


export const DebugReactQueryDevtoolsPanel : FC = () => {
    const { reactQueryDevtools } = useDebugCtx()
    const [isMounted, setIsMounted] = useState(false)
    const id = useId()

    let portalEl = typeof document === "undefined"
        ? null
        : document.querySelector<HTMLDivElement>(`[data-rq-devtools-container="${id}"]`)

    useEffect(() => {
        if (!reactQueryDevtools.isOpen) {
            portalEl?.remove()
            setIsMounted(false)
            return
        }

        if (!portalEl) {
            portalEl = document.createElement("div")
            portalEl.dataset.rqDevtoolsContainer = id
            portalEl.className = "fixed bottom-0 z-[998] w-full"
            document.body.append(portalEl)
        }

        setIsMounted(true)
    }, [reactQueryDevtools.isOpen])


    if (!reactQueryDevtools.isOpen || !isMounted) return null

    return createPortal(
        <ReactQueryDevtoolsPanel
            setIsOpen={(isOpen) => reactQueryDevtools[isOpen ? "open" : "close"]()}
            onDragStart={reactQueryDevtools.close}
        // position="bottom"
        // className="!fixed !bottom-0 !left-0"

        />,
        portalEl!,
        id
    )
}

export const DebugReactQueryDevtoolsMenu = () => {
    const { reactQueryDevtools } = useDebugCtx()

    return (<>
        <div className="max-h-full h-full overflow-hidden">
            <h2 className="text-xl mb-4">React Query devtools</h2>

            <BaseLightSwitch
                name="rq-devtools"
                value={reactQueryDevtools.isOpen}
                onChange={() => reactQueryDevtools.toggle()}
                label={`React Query devtools are ${reactQueryDevtools.isOpen ? "visible" : "hidden"}.`}
            />
        </div>
    </>)
}
