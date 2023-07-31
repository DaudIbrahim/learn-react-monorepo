import { Form, Modal, Stack, Row, Col, Button } from "react-bootstrap"
import { Tag } from "../App"

type EditTagsModalProps = {
    show: boolean;
    handleClose: () => void,
    availableTags: Tag[],
    updateTag: (id: string, label: string) => void,
    deleteTag: (id: string) => void,
}

export function EditTagsModal({ show, handleClose, availableTags, updateTag : onUpdateTag, deleteTag : onDeleteTag }: EditTagsModalProps) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Tags</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Stack gap={2}>
                        {availableTags.map(tag => (
                            <Row key={tag.id}>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        value={tag.label}
                                        onChange={(e) => onUpdateTag(tag.id, e.target.value)}
                                    />
                                </Col>
                                <Col xs="auto">
                                    <Button variant="outline-danger" onClick={() => onDeleteTag(tag.id)}>
                                        &times;
                                    </Button>
                                </Col>
                            </Row>
                        ))}
                    </Stack>
                </Form>
            </Modal.Body>
        </Modal>
    )
}