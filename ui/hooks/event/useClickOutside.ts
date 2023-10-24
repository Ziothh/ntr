import { useEffect, useRef } from "react"

const useClickOutside = (
    elementRef: React.MutableRefObject<HTMLElement>, 
    callback: (e: MouseEvent) => void
) => {
    const callbackRef = useRef<(e: MouseEvent) => void>()
    callbackRef.current = callback

     useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (elementRef?.current?.contains((e.target as Element))) return
            callbackRef.current!(e)
         }
    
        document.addEventListener("click", handleClickOutside, true)
    
        return () => {
            document.removeEventListener("click", handleClickOutside, true)
        }
     }, [callbackRef, elementRef])
}

export default useClickOutside
