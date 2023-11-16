/** Force eager evaluation of a type */
export type prettyFy<T> = { [K in keyof T]: T[K] }
