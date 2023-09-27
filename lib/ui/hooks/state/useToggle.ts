import { useState } from "react"

const useToggle = (defaultValue: boolean) => {
    const [value, setValue] = useState(defaultValue)

    const toggleValue = (newValue?: boolean) => setValue(
        currentValue => newValue === undefined
            ? !currentValue
            : newValue
    )

    return [value, toggleValue] as const
} 

export default useToggle