import type { Dirent } from "fs"
import { parseFileName } from "./helpers"

export enum NextFileType {
    PAGE = "page",
    LAYOUT = "layout",
    ERROR = "error",
    LOADING = "loading",
    TEMPLATE = "template"
}

export type NextFileTypeTruthMap = {[key in NextFileType]: boolean}

const fileTypeSet = new Set(Object.values(NextFileType))

const isFileType = (name: string): name is NextFileType => fileTypeSet.has(name as any)


export const parseFileTypes = (dir: Dirent[]) => dir.reduce<NextFileTypeTruthMap>(
    (acc, d) => {
        const name = parseFileName(d.name)

        if (!isFileType(name)) return acc

        return {
            ...acc,
            [name]: true,
        }
    }, 
    {
        loading: false,
        error: false,
        layout: false,
        page: false,
        template: false,
    }
)