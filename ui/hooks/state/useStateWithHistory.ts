import { useCallback, useRef, useState } from "react"

const useStateWithHistory = <T>(defaultValue: T, capacity: number = 10) => {
    const [state, setState] = useState(defaultValue)
    
    const historyRef = useRef([state])
    const pointerRef = useRef(0)

    const setCurrentlyActiveValue = (index: number) => setState(historyRef.current[index])

    /** Wrapper for the setState action */
    const setStateWrapper: React.Dispatch<React.SetStateAction<T>> = useCallback((value) => {
        const resolvedValue: T = typeof value === "function" ? (value as any)(state) : value

        if (historyRef.current[pointerRef.current] !== resolvedValue) {
            if (pointerRef.current < historyRef.current.length - 1) {
                historyRef.current.splice(pointerRef.current + 1)
            }

            historyRef.current.push(resolvedValue)

            while (historyRef.current.length > capacity) {
                // Remove the first state histories
                historyRef.current.shift()
            }
            
            pointerRef.current = historyRef.current.length - 1
        }

        setState(resolvedValue)
    }, [state, capacity])

    const back = useCallback(() => {
        if (pointerRef.current <= 0) return

        pointerRef.current --
        setCurrentlyActiveValue(pointerRef.current)
    }, [])

    const forward = useCallback(() => {
        if (pointerRef.current >= historyRef.current.length - 1) return

        pointerRef.current ++
        setCurrentlyActiveValue(pointerRef.current)
    }, [])

    const go = useCallback((index: number) => {
        const historyLength = historyRef.current.length

        if (index >= 0) {
            // Positive index
            if (index >= historyLength) return
            pointerRef.current = index
        } else {
            // Negative index
            const absIndex = Math.abs(index)
            if (absIndex > historyLength) return
            pointerRef.current = historyLength - absIndex
        }

        setCurrentlyActiveValue(pointerRef.current)
    }, [])

    return [
        state,
        setStateWrapper,
        {
            history: historyRef.current,
            pointerRef: pointerRef.current,
            back,
            forward,
            go
        }
    ]
}

export default useStateWithHistory
