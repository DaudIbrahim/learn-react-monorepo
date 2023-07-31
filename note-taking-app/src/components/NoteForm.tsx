import { Link, useNavigate } from "react-router-dom"
import { Form, Stack, Row, Col, Button } from "react-bootstrap"
import { FormEvent, useRef, useState } from "react"
import CreatableSelect from "react-select/creatable"
import { v4 as uuidV4 } from "uuid"
import { NoteData, Tag } from "../App"

type NoteFormProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void,
    availableTags: Tag[]
} & Partial<NoteData>

// [ ] TS: note types in here | in Array Destructuring | in useRef<>
export function NoteForm({
    onSubmit,
    onAddTag,
    availableTags,
    title = "",
    markdown = "",
    tags = [],
}: NoteFormProps) {

    const titleRef = useRef<HTMLInputElement>(null)
    const markdownRef = useRef<HTMLTextAreaElement>(null)
    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)
    const navigate = useNavigate()

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        onSubmit({
            /**
             * [ ] TS:
             * non-null assertion operator - https://stackoverflow.com/a/42274019
             * A value coud be null but with ! we are saying it could never be null
             */
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags: selectedTags,
        })

        navigate("../")
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Stack gap={4}>
                    <Row>
                        <Col>
                            <Form.Group controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control ref={titleRef} required defaultValue={title} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="tags">
                                <Form.Label>Tags</Form.Label>
                                <CreatableSelect
                                    isMulti
                                    options={availableTags.map((tag) => {
                                        return { label: tag.label, value: tag.id }
                                    })}
                                    onCreateOption={label => {
                                        // On create Tag calls this function
                                        const newTag = {
                                            id: uuidV4(),
                                            label
                                        }
                                        onAddTag(newTag)
                                        // [ ] React: Any time I need to compute new state based on previous state, I use a function update - https://kentcdodds.com/blog/use-state-lazy-initialization-and-function-updates#dispatch-function-updates
                                        setSelectedTags(prev => [...prev, newTag])
                                    }}
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
                    <Form.Group controlId="markdown">
                        <Form.Label>Body</Form.Label>
                        <Form.Control required as="textarea" ref={markdownRef} rows={15} defaultValue={markdown} />
                    </Form.Group>

                    <Stack direction="horizontal" gap={2} className="justify-content-end">
                        <Button type="submit" variant="outline-primary">
                            Save
                        </Button>
                        <Link to="...">
                            <Button type="button" variant="outline-secondary">
                                Cancel
                            </Button>
                        </Link>
                    </Stack>
                </Stack>
            </Form>
        </>
    )
}