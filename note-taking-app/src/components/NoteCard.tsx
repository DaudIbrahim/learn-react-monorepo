import { Card, Badge, Stack } from "react-bootstrap"
import { Tag } from "../App"
import { Link } from "react-router-dom"
import styles from "../css/NoteList.module.css"

type NoteCardProps = {
    tags: Tag[]
    title: string,
    id: string,
}

export function NoteCard({ id, title, tags }: NoteCardProps) {
    return (
        <Card as={Link} to={`/${id}`} className={`h-100 text-reset text-decoration-none ${styles.card}`}>
            <Card.Body>
                <Stack gap={2} className="align-items-center justify-contect-center h-100">
                    <span className="fs-5">{title}</span>
                    <Stack gap={1} direction="horizontal" className="justify-content-center flex-wrap">
                        {tags.length > 0 && tags.map(tag => (
                            <Badge key={tag.id} className="text-truncate">
                                {tag.label}
                            </Badge>
                        ))}
                    </Stack>
                </Stack>
            </Card.Body>
        </Card>
    )
}