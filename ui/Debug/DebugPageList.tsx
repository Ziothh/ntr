"use client"

import { Disclosure } from "@headlessui/react"
import { ChevronRightIcon, ChevronUpIcon } from "@heroicons/react/20/solid"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import type { FC } from "react"
import { useDebugCtx } from "."

import { NextRoute } from '../../generated/types'


interface Props {
  routes: NextRoute[]
}


const DebugPageList: React.FC<Props> = ({
  routes
}) => {
  return (
    <div className="max-h-full overflow-hidden">
      <h2 className="text-xl mb-4">Pages</h2>

      <div className="max-h-full h-full overflow-y-auto overflow-x-hidden flex flex-col gap-1">

        {routes.map((r, i) => r.parentIndex !== null ? null : (
          <PageList key={r.urlPath} index={i} routes={routes} />
        ))}
      </div>
    </div>
  )
}


export default DebugPageList


const PageList: FC<{ index: number, routes: NextRoute[] }> = ({ index, routes }) => {
  const router = useRouter()
  const { modal } = useDebugCtx()

  const route = routes[index]!;
  const subRoutes = routes.filter(x => x.parentIndex === index);


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
                  subRoutes.length === 0 && "opacity-0 pointer-events-none"
                )}
              />
            </Disclosure.Button>

            <button className="flex gap-2 w-full py-2 pr-4"
              onClick={() => alert("TODO")}
            >
              <h3>{
                route.urlPath
                  .split("/")
                  .map(
                    (p, i, arr) =>
                      i === 0
                        ? arr.length === 1
                          ? (<span key={`${p}_${i}`} className="font-bold">/</span>)
                          : null
                        : i === arr.length - 1
                          ? <span key={`${p}_${i}`} className="font-bold">/ {p}</span>
                          : <span key={`${p}_${i}`} className="opacity-25">/ {p} </span>
                  )
              }</h3>
              <p className="block ml-auto w-fit">
                [{route.router.type}] ({route.purpose})
              </p>

            </button>
          </div>
          <Disclosure.Panel as={"div"}>
            <div className="flex flex-col gap-1 pl-4">
              {subRoutes.map(sr => (
                <div key={sr.urlPath} className="first:mt-1">
                  <PageList
                    key={sr.urlPath}
                    index={routes.findIndex(r => r.absolutePath === sr.absolutePath)}
                    routes={routes}
                  />
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
