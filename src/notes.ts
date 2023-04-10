interface NotePayload {
    title: string
    tags: string[]
    body: string
}

interface Note {
    id: string
    title: string
    createdAt: string
    updatedAt: string
    tags: string[]
    body: string
}

const notes: Note[] = [];

export {NotePayload, Note, notes}