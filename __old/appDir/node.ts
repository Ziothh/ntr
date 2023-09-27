import { readdir } from "fs/promises";

export const readDir = async (absPath: string) => await readdir(absPath, {
    withFileTypes: true,
})