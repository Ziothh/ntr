import type { Dirent } from "fs"
import { NextFileTypeTruthMap, parseFileTypes } from "./fileType"
import { resolve } from "path"
import { readDir } from "./helpers"

type SharedAppDirRouteData = {
    contents: NextFileTypeTruthMap,
    path: string
    subRoutes: AppDirRoute[]
}
export type AppDirRoute = SharedAppDirRouteData & (
    {
        type: "group"
        groupName: string
        urlPath: string | null
    } | {
        type: "static"
        urlPath: string
    } | {
        type: "dynamic"
        urlPath: string
        paramName: string
    } // TODO: maybe add "void" as a type or extra parameter for folders without page.tsx
)

type RouteType = AppDirRoute["type"]

const parseRouteType = (folderName: string): RouteType => {
    if (folderName.startsWith("(") && folderName.endsWith(")")) return "group"
    if (folderName.startsWith("[") && folderName.endsWith("]")) return "dynamic"

    return "static"
}


const parseDir = async (
    folderName: string,
    previousData: {
        absolutePath: string
        relativePath: string
        urlPath: string | null
    }, 
    isInitial = false
    // dirName: string, 
    // meta: any,
    // previousData: {
    //     baseAbsPath: string
    // //     absPath: string
    // //     url: string,
    // //     dirMap: AppDirRoutes[],
    // }
): Promise<AppDirRoute> => {
    /**
     * Read dir
     * check for page 
     *  if page add
     * 
     * check for folders
     *  if folder and not (folderName): update url
     */
    const absPath = resolve(previousData.absolutePath, folderName)

    const dir = await readDir(absPath)

    const [files, directories] = dir.reduce<[files: Dirent[], directories: Dirent[]]>(
        (acc, d) => {
            const [files, directories] = acc

            if (d.isFile()) return [[...files, d], directories]
            if (d.isDirectory()) return [files, [...directories, d]]

            return acc
        }, 
        [[], []]
    )

 

    const type = parseRouteType(folderName)

    const newData: typeof previousData = {
        absolutePath: resolve(previousData.absolutePath, folderName),
        relativePath: isInitial ? "/" : resolve(previousData.relativePath, folderName),
        // ! if new types are added this can cause bugs
        urlPath: (type === "group" || isInitial)
        ? previousData.urlPath
        : resolve(previousData.urlPath ?? "/", folderName)
    }

    const sharedReturnValue: SharedAppDirRouteData = {
        contents: await parseFileTypes(files),
        path: newData.relativePath,
        subRoutes: await Promise.all(
            directories.map(
                d => parseDir(d.name, newData, false)
            )
        ) // TODO: recursive
    }


    switch (type) {
        case "static":
            return {
                ...sharedReturnValue,
                type,
                urlPath: newData.urlPath ?? "/NULL" // TODO
            }
        case "dynamic":
            return {
                ...sharedReturnValue,
                type,
                paramName: folderName.slice(1, -1),
                urlPath: newData.urlPath ?? "/NULL" // TODO
            }
        case "group":
            return {
                ...sharedReturnValue,
                type,
                groupName: folderName.slice(1, -1),
                urlPath: sharedReturnValue.contents.page
                    ? newData.urlPath ?? "/"
                    : null
            }
    }
}

export const parseAppDir = async () => {
    const basePath = resolve(process.cwd(), "src")

    // There is still a little issue where there is an "url"
    // for directories that don't have a page but do have route groups

    const result = await parseDir("app", {
        absolutePath: basePath,
        urlPath: null,
        relativePath: "/", // TODO: maybe do the same as urlPath
    }, true)

    return result
}