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

function getDetailNote(
    request: Request<ReqRefDefaults>,
    h: ResponseToolkit<ReqRefDefaults>
): Response | ResponseObject {
    const { id } = request.params

    const note = notes.filter(e => e.id === id)[0]

    if (note != undefined) {
        return {
            status: "success",
            data: {
                note
            }
        }
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
    })
    response.code(404)

    return response
}

function editNoteHandler(
    request: Request<ReqRefDefaults>,
    h: ResponseToolkit<ReqRefDefaults>
): ResponseObject {
    const { id } = request.params
    const { title, tags, body } = request.payload as NotePayload

    const updatedAt = new Date().toISOString();
    const index = notes.findIndex((note) => note.id === id);

    if (index != -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt
        }

        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diperbarui',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui catatan. Id tidak ditemukan',
    });
    response.code(404);
    return response;
}

function deleteNote(
    request: Request<ReqRefDefaults>,
    h: ResponseToolkit<ReqRefDefaults>
): ResponseObject {
    const { id } = request.params;
 
    const index = notes.findIndex((note) => note.id === id);
    
    if (index !== -1) {
        notes.splice(index, 1);
        const response = h.response({
        status: 'success',
        message: 'Catatan berhasil dihapus',
        });
        response.code(200);
        return response;
    }
    
    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
}

export {
    addNoteHandler,
    getNotesHandler,
    getDetailNote,
    editNoteHandler,
    deleteNote
}