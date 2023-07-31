import { Navigate, Outlet, useParams } from "react-router-dom"
import { Note } from "../App"

/**
 * Dynamic Parameters
 * https://blog.webdevsimplified.com/2022-07/react-router/#:~:text=In%20our%20case%20our%20dynamic%20parameter%20is%20%3Aid
 * 
 * Search Parameters
 * https://blog.webdevsimplified.com/2022-07/react-router/#:~:text=information%20like%20ids.-,Search%20Parameters,-Search%20parameters%20are 
*/

type NoteLayoutProps = {
    notes: Note[]
}

export function NoteLayout({ notes }: NoteLayoutProps) {
    // [ ] React: Dynamic Parameters ( /:id ) | Search Parameters ( ?page=10 )
    const { id } = useParams()
    const note = notes.find((note => note.id === id))

    if (!note)
        return <Navigate to="/" replace />
    else
        return (
            <>
                {/* React: Outlet with Context - https://blog.webdevsimplified.com/2022-07/react-router/#:~:text=The%20final%20important%20thing%20to%20know%20about%20Outlet%20components%20is%20they%20can%20take%20in%20a%20context%20prop%20which%20will%20work%20just%20like%20React%20context. */}
                <Outlet context={note} />
            </>
        )
}