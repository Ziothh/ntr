import { useRef } from "react"

/** Returns the previous value of the passed state value */
const usePrevious = <T>(value: T) => {
    const currentRef = useRef(value)
    const previousRef = useRef<T>()

    if (currentRef.current !== value) {
        previousRef.current = currentRef.current
        currentRef.current = value
    }

    return previousRef.current
}

export default usePrevious
