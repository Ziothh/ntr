import { readdir } from "fs/promises";

export const readDir = async (absPath: string) => await readdir(absPath, {
    withFileTypes: true,
})

export const parseFileName = (fileName: string) => {
    const parts = fileName.split(".")
    parts.pop()
    return parts.join(".")
}