import { useOutletContext } from "react-router-dom"
import { Note } from "../App"

export function useNoteOutletContextHelper() {
    return useOutletContext<Note>()
}
