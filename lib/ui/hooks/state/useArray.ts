import { useState } from "react"

const useArray = <T>(defaultValue: T[]) => {
    const [array, setArray] = useState(defaultValue)

    const push = (element: T) => {
        setArray(prev => [...prev, element])
    }

    const filter = (callback: Parameters<typeof array.filter>[0]) => {
        setArray(prev => prev.filter(callback))
    }

    const update = (index: number, newElement: T) => {
        setArray(prev => [
            ...prev.slice(0, index),
            newElement,
            ...prev.slice(index + 1, prev.length -1)
        ])
    }

    const remove = (index: number) => {
        setArray(prev => [
            ...prev.slice(0, index), 
            ...prev.slice(index + 1, prev.length - 1)
        ])
    }

    return {
        value: array,
        push, 
        remove,
        filter, 
        update, 
    }
}


export default useArray
