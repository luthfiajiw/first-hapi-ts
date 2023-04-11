import { ReqRefDefaults, Request, ResponseToolkit, ResponseObject } from "@hapi/hapi";
import { v4 as uuidv4 } from 'uuid';
import {notes, NotePayload, Note, Response} from "./notes";

function addNoteHandler(
    request: Request<ReqRefDefaults>,
    h: ResponseToolkit<ReqRefDefaults>
): Promise<ResponseObject> {
    const { title, tags, body } = request.payload as NotePayload

    const id = uuidv4()
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote: Note = {
        id,
        createdAt,
        updatedAt,
        title,
        tags,
        body,
    };
    
    notes.push(newNote);
    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: "success",
            message: "Note successfully added",
            data: {
                noteId: id
            }
        })
        response.code(201)
        return Promise.resolve(response)
    }

    const response = h.response({
        status: "failed",
        message: "Failed to add note"
    })
    response.code(500)
    return Promise.reject(response)
}

function getNotesHandler(): Response {
    return {
        status: "success",
        data: {
            notes
        }
    }
}

export { addNoteHandler, getNotesHandler }