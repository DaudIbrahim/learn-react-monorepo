import { useState, useMemo } from "react"
import { Link } from "react-router-dom"
import { Form, Stack, Row, Col, Button } from "react-bootstrap"
import ReactSelect from "react-select"
import { Tag, Note } from "../App"
import { NoteCard } from "../components/NoteCard"
import { EditTagsModal } from "../components/EditTagsModal"

type NoteListProps = {
    availableTags: Tag[]
    notes: Note[]
    updateTag: (id: string, label: string) => void,
    deleteTag: (id: string) => void,
}

export function NoteList({ availableTags, notes, updateTag, deleteTag }: NoteListProps) {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [title, setTitle] = useState("")
    const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false)

    const filteredNotes = useMemo<Note[]>(() => {
        return notes.filter(note => {
            // [ ] JS: Use of Array methods: includes | every | some
            return (
                (
                    title === "" ||
                    // https://stackoverflow.com/a/64946579/7031530
                    // includes does a generic equalTo comparison on every element and will return true if at least one element in the array is equal to the value to find.
                    note.title.toLowerCase().includes(title.toLowerCase())
                )
                &&
                (
                    selectedTags.length === 0 ||
                    // some takes in a callback function where you can write your own logic to determine if an array contains some element which matches the conditions you wrote.
                    selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id))
                )
            )

        })
    }, [title, notes, selectedTags])

    return (
        <>
            <Row className="align-items-center mb-4">
                <Col>
                    <h1 className="mb-4">Note List</h1>
                </Col>

                <Col xs="auto">
                    <Stack gap={2} direction="horizontal">
                        <Link to={"/new"}>
                            <Button variant="primary">Create</Button>
                        </Link>
                        <Button variant="outline-secondary"
                            onClick={() => setEditTagsModalIsOpen(true)}>
                            Edit Tags
                        </Button>
                    </Stack>
                </Col>
            </Row>

            <Form>
                <Row className="mb-4">
                    <Col>
                        {/* [x] - React dot notation component with TS - https://dev.to/alexandprivate/react-dot-notation-component-with-ts-49k8 */}
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="tags">
                            <Form.Label>Tags</Form.Label>
                            <ReactSelect
                                isMulti
                                options={availableTags.map((tag) => {
                                    return { label: tag.label, value: tag.id }
                                })}
                                value={selectedTags.map(tag => {
                                    // value on a input component
                                    return { label: tag.label, value: tag.id }
                                })}
                                onChange={tags => {
                                    setSelectedTags(tags.map(tag => {
                                        return { label: tag.label, id: tag.value }
                                    }))
                                }}
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>

            <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
                {filteredNotes.map((note) => {
                    return (
                        <Col key={note.id}>
                            <NoteCard
                                id={note.id}
                                title={note.title}
                                tags={note.tags}
                            />
                        </Col>
                    )
                })}
            </Row>

            <EditTagsModal
                show={editTagsModalIsOpen}
                handleClose={() => setEditTagsModalIsOpen(false)}
                availableTags={availableTags}
                updateTag={updateTag}
                deleteTag={deleteTag}
            />
        </>
    )
}