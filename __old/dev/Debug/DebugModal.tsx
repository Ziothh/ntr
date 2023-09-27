"use client"

import { Dialog, Transition } from "@headlessui/react"
import { CodeBracketSquareIcon, XMarkIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import { Fragment, PropsWithChildren, useState } from "react"
import { useDebugCtx } from "./DebugContext"




interface Props {
    
}


const DebugModal: React.FC<PropsWithChildren<Props>> = ({
    children,
}) => {
    const {modal} = useDebugCtx()

    // useEffect(() => {
    //     setIsOpen(true)
    // }, [])

    return (
        <Transition 
        show={modal.isOpen} 
        as={Fragment}
        >
            <Dialog onClose={() => modal.close()}
            className={"fixed inset-0 flex justify-center items-center z-999 p-6 md:p-12"}
            >
                {/*
                Use one Transition.Child to apply one transition to the backdrop...
                */}
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                    <Dialog.Backdrop className="fixed inset-0 bg-neutral-900/30 backdrop-blur-md" />
                </Transition.Child>

                {/*
                ...and another Transition.Child to apply a separate transition
                to the contents.
                */}
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
                >
                    <Dialog.Panel className={clsx(
                        `relative bg-neutral-900 text-white p-6 md:p-10 rounded-md w-full h-full max-h-full overflow-y-auto overflow-x-hidden`, 
                    )}
                    >
                        {/* <Dialog.Title>My modal</Dialog.Title> */}
                        {children}

                        <button className="absolute text-white/30 top-0 right-0 p-6"
                        onClick={() => modal.close()}
                        >
                            <XMarkIcon className="h-6"/>
                        </button>
                    </Dialog.Panel>
                </Transition.Child>
            </Dialog>
            {/* <div className={clsx(`
            fixed top-0 left-0 w-screen h-screen 
            flex items-center justify-center
            bg-gray-900 bg-opacity-30 backdrop-blur-md
            `, 
            backdropClassName
            )}
            onClick={
                onBackdropClick
                ? (e) => {
                    if (!contentRef.current) return
                    if (!contentRef.current.contains(e.target as any)) onBackdropClick()
                }
                : undefined
            }
            >
            
            </div> */}
        </Transition>
    )
}


export default DebugModal