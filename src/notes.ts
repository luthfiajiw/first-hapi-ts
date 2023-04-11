interface Response {
    status: string
    message?: string
    data?: Data
}

interface Data {
    notes?: Note[]
    note?: Note
}

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

export {Response, NotePayload, Note, notes}