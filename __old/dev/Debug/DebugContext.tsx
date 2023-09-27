"use client"

import { contextFactory, useToggle } from "~/lib/react/hooks/dist";

export const [DebugContextProvider, useDebugCtx] = contextFactory(() => {
    const [isModalOpen, toggleIsModalOpen] = useToggle(false)
    const [isReactQueryDevtoolsOpen, toggleIsReactQueryDevtoolsOpen] = useToggle(false)

    return {
        modal: {
            isOpen: isModalOpen,
            toggle: () => toggleIsModalOpen(),
            open: () => toggleIsModalOpen(true),
            close: () => toggleIsModalOpen(false),
        },
        reactQueryDevtools: {
            isOpen: isReactQueryDevtoolsOpen,
            toggle: () => toggleIsReactQueryDevtoolsOpen(),
            open: () => toggleIsReactQueryDevtoolsOpen(true),
            close: () => toggleIsReactQueryDevtoolsOpen(false),
        },
    }
})
