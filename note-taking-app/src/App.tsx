import "bootstrap/dist/css/bootstrap.min.css"
import { useMemo } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { Container } from "react-bootstrap"
import { useLocalStorage } from "./hooks/useLocalStorage"
import { v4 as uuidV4 } from "uuid"

import { NoteLayout } from "./layout/NoteLayout"

import { NewNote } from "./pages/NewNote"
import { NoteList } from "./pages/NoteList"
import { NoteDisplay } from "./pages/NoteDisplay"
import { EditNote } from "./pages/EditNote"

export type Tag = {
  id: string,
  label: string
}

export type Note = {
  id: string
} & NoteData

export type NoteData = {
  title: string,
  markdown: string,
  tags: Tag[],
}

export type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string,
  markdown: string,
  tagIds: string[],
}

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }
    })
  }, [notes, tags])

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes(prevNotes => {
      return [...prevNotes, { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) }]
    })
  }

  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map(tag => tag.id) }
        } else {
          return note
        }
      })
    })
  }

  function onDeleteNote(id: string) {
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id)
    })
  }

  function addTag(tag: Tag) {
    setTags(prev => [...prev, tag])
  }

  function updateTag(id: string, label: string) {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) {
          return { ...tag, label }
        } else {
          return tag
        }
      })
    })
  }

  function deleteTag(id: string) {
    setTags(prevTags => {
      return prevTags.filter(tag => tag.id !== id)
    })
  }

  return (
    <>
      <Container className="my-4">

        {/** Declaring the routes in here. Declarative route declaration */}
        <Routes>
          <Route
            path="/"
            element={
              <NoteList
                availableTags={tags}
                notes={notesWithTags}
                updateTag={updateTag}
                deleteTag={deleteTag}
              />}
          />

          <Route
            path="/new"
            element={
              <NewNote
                onSubmit={onCreateNote}
                onAddTag={addTag}
                availableTags={tags}
              />
            }
          />

          {/* [ ] React: Nested Routes-Shared Layouts */}
          {/* https://blog.webdevsimplified.com/2022-07/react-router/#:~:text=handles%20shared%20layouts.-,Shared%20Layouts,-Let%E2%80%99s%20imagine%20that */}
          <Route
            path="/:id"
            element={
              <NoteLayout
                notes={notesWithTags}
              />
            }
          >

            <Route
              index
              element={
                < NoteDisplay
                  onDelete={onDeleteNote}
                />
              }
            />
            <Route
              path="edit"
              element={
                <EditNote
                  onSubmit={onUpdateNote}
                  onAddTag={addTag}
                  availableTags={tags}
                />}
            />
          </Route>

          <Route path="*" element={< Navigate to="/" />} />
        </Routes>

      </Container>
    </>
  )
}

export default App
