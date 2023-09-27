"use client"

import { Disclosure } from "@headlessui/react"
import { ChevronRightIcon, ChevronUpIcon } from "@heroicons/react/20/solid"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import type { FC } from "react"
import { Fragment } from "react"
import type { AppDirRoute } from "~/server/common/appDir"
import { useDebugCtx } from "./DebugContext"


interface Props {
    appDir: AppDirRoute
}


const DebugPageList: React.FC<Props> = ({
    appDir
}) => {
    return (
        <div className="max-h-full overflow-hidden">
            <h2 className="text-xl mb-4">Pages</h2>

            <div className="max-h-full h-full overflow-y-auto overflow-x-hidden flex flex-col gap-1">
                
                {appDir.contents.page 
                ? <PageList route={appDir}/>
                : appDir.subRoutes.map(sr => <PageList key={sr.path} route={sr}/>)}
            </div>
        </div>
    )
}


export default DebugPageList


const PageList: FC<{route: AppDirRoute}> = ({route}) => {
    const router = useRouter()
    const {modal} = useDebugCtx()
    // if (!route.contents.page) return
    return (<>
        

        <Disclosure as={"div"}>
        {({ open }) => (
            <>
                <div className="
                flex
                text-left text-sm font-medium
                text-purple-900 bg-purple-100
                cursor-pointer
                hover:bg-purple-200
                focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75
                rounded-lg
                ">
                     <Disclosure.Button as="button" className="px-4 py-2 pr-2">
                        <ChevronRightIcon
                        className={clsx(
                            "h-5 w-5 text-purple-500",
                            !open && '-rotate-90 transform',
                            route.subRoutes.length === 0 && "opacity-0 pointer-events-none"
                        )}
                        />
                    </Disclosure.Button>

                    <button className="flex gap-2 w-full py-2 pr-4"
                    onClick={
                        route.type === "group"
                        ? () => {
                            if (!route.contents.page) alert("This is a layout group so it can't be navigated to")
                            else {
                                router.push(route.urlPath!)
                                modal.close()
                            }
                        }
                        : !route.contents.page
                            ? () => alert("This route segement has no page.tsx file. Please add one")
                            : route.type === "dynamic"
                                ? () => {
                                    window.navigator.clipboard.writeText(route.urlPath)
                                    alert([
                                        "This is a dynamic route so you'll need to manually set the parameters.",
                                        "\nThe path has been copied to your clipboard."
                                    ].join("\n"))
                                }
                                : () => {
                                    router.push(route.urlPath)
                                    modal.close()
                                }
                    }
                    >
                        <h3>{
                            route.path
                            .slice(1,)
                            .split("/")
                            .map(
                                (p, i, arr) => i === arr.length - 1
                                    ? <span key={`${p}_${i}`} className="font-bold">{p}</span>
                                    : <span key={`${p}_${i}`} className="opacity-25">{p} /</span>
                            )
                        }</h3>
                        <p className="block ml-auto w-fit">
                            {
                                route.type === "group"
                                    ? `(${route.type})`
                                    : route.type === "dynamic"
                                        ? `[${route.type}]`
                                        : route.type
                            }
                        </p>
                    
                    </button>
                </div>
                <Disclosure.Panel as={"div"}>
                    <div className="flex flex-col gap-1 pl-4">
                            {route.subRoutes.map(sr => (
                                <div key={sr.path} className="first:mt-1">
                                    <PageList key={sr.path} route={sr}/>
                                </div>
                            ))}
                    </div>
                </Disclosure.Panel>
            </>
        )}
        </Disclosure>
   

        {/* <ul>
            {route.subRoutes.map(sr => (
                <li key={sr.path}>
                    <PageList route={sr}/>
                </li>
            ))}
        </ul> */}
    </>)
}