import { Link, useNavigate } from "react-router-dom"
import { Stack, Row, Col, Badge, Button } from "react-bootstrap"
import { useNoteOutletContextHelper } from "../helpers/useNoteOutletContextHelper"
import ReactMarkdown from "react-markdown"

type NoteDisplayProps = {
    onDelete: (id: string) => void
}

export function NoteDisplay({ onDelete }: NoteDisplayProps) {
    const note = useNoteOutletContextHelper()
    const navigate = useNavigate()

    return (
        <>
            <Row className="align-items-center mb-4">
                <Col>
                    <h2>{note.title}</h2>

                    <Stack gap={1} direction="horizontal" className="flex-wrap">
                        {note.tags.length > 0 && note.tags.map(tag => (
                            <Badge key={tag.id} className="text-truncate">
                                {tag.label}
                            </Badge>
                        ))}
                    </Stack>
                </Col>

                <Col xs="auto">
                    <Stack gap={2} direction="horizontal">
                        <Link to={`/${note.id}/edit`}>
                            <Button variant="primary">Edit</Button>
                        </Link>

                        <Button
                            variant="outline-danger"
                            onClick={() => {
                                onDelete(note.id)
                                navigate("/")
                            }}
                        >
                            Delete
                        </Button>

                        <Link to={"../"}>
                            <Button variant="outline-secondary">Back</Button>
                        </Link>
                    </Stack>
                </Col>
            </Row>

            <ReactMarkdown>
                {note.markdown}
            </ReactMarkdown>
        </>
    )
}