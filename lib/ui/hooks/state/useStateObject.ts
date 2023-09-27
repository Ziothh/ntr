import { useState } from "react"

// Todo: make overloads
const useStateObject = <T>(defaultValue: T): StateObject<T> => {
    const [state, setState] = useState(defaultValue)

    return {
        value: state,
        set: setState,
    }
}

export type StateObject<T> = {
    value: T,
    set: React.Dispatch<React.SetStateAction<T>>
}

export default useStateObject