import { useState } from "react"
import { StateObject } from "./useStateObject"

const useResetableState = <T>(defaultValue: T) => {
    const [state, setState] = useState<T>(defaultValue)

    return {
        value: state,
        set: setState,
        reset: () => setState(defaultValue)
    }
}

export interface ResetableStateObject<T> extends StateObject<T> {
    reset: () => void
}

export default useResetableState
