import { useEffect } from "react"

interface KeyMap {[key: string]: (e: KeyboardEvent) => void}

/** Mounts keydown events for all of the key callbacks defined in the keymaps. 
 *
 * This is done when the component mounts.
 * */
const useKeypress = <Map extends {
    /** A keymap for keys that should do something when no special keys (like Meta) are pressed. */
    normal?: KeyMap, 
    /** A keymap for keys that are pressed in combination with the `Meta`(cmd / ctrl) key. */
    meta?: KeyMap
}>(map: Map) => {
    const {meta, normal} = map

    // const heldKeysRef = useRef({
    //     cmd: false,
    // })

    const keydown = (e: KeyboardEvent) => {
        const mapVariant = e.metaKey ? meta : normal

        if (mapVariant === undefined) return 

        const action = mapVariant[e.key.toUpperCase()] ?? mapVariant[e.key.toLowerCase()]

        if (action === undefined) return

        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()

        action(e)
    }
    // const keyup = (e: KeyboardEvent) => {

    // }
    /** Mount all of the event listeners */
    const mount = () => {
        document.addEventListener("keydown", keydown)
        // document.addEventListener("keydown", keyup)
    }
    /** Unmount all of the event listeners */
    const unmount = () => {
        document.removeEventListener("keydown", keydown)
        // document.removeEventListener("keyup", keyup)
    }

    
    useEffect(() => {
        mount()

        return unmount
    }, [map, keydown])

    return {
        mount,
        unmount,
        map,
    }
}


export default useKeypress
