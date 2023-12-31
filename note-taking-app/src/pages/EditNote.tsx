import { NoteData, Tag } from "../App";
import { NoteForm } from "../components/NoteForm";
import { useNoteOutletContextHelper } from "../helpers/useNoteOutletContextHelper"

type EditNoteProps = {
    onSubmit: (id: string, data: NoteData) => void,
    onAddTag: (tag: Tag) => void,
    availableTags: Tag[]
}

export function EditNote({ onSubmit, onAddTag, availableTags }: EditNoteProps) {
    const note = useNoteOutletContextHelper()

    return (
        <>
            <h1 className="mb-4">Edit Note</h1>
            <NoteForm
                onSubmit={data => onSubmit(note.id, data)}
                onAddTag={onAddTag}
                availableTags={availableTags}

                title={note.title}
                markdown={note.markdown}
                tags={note.tags}
            />
        </>
    )
}