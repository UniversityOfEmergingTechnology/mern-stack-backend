import {useEffect} from 'react'

export default function useOnClickOutside(ref , handler){
    useEffect(() => {
        const listener = (event) => {
            if(!ref.current || ref.current.contains(event.target)){
                return;
            }
            handler(event)
        }

        // add event listeners for mousedown and touchstart events on document
        document.addEventListener("mousedown" , listener)
        document.addEventListener("touchstart" , listener)

        return () => {
            document.removeEventListener("mousedown" , listener)
            document.removeEventListener("touchstart" , listener)
        }
    } , [ref , handler])   
}