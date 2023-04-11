"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.editNoteHandler = exports.getDetailNote = exports.getNotesHandler = exports.addNoteHandler = void 0;
const uuid_1 = require("uuid");
const notes_1 = require("./notes");
function addNoteHandler(request, h) {
    const { title, tags, body } = request.payload;
    const id = (0, uuid_1.v4)();
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const newNote = {
        id,
        createdAt,
        updatedAt,
        title,
        tags,
        body,
    };
    notes_1.notes.push(newNote);
    const isSuccess = notes_1.notes.filter((note) => note.id === id).length > 0;
    if (isSuccess) {
        const response = h.response({
            status: "success",
            message: "Note successfully added",
            data: {
                noteId: id
            }
        });
        response.code(201);
        return Promise.resolve(response);
    }
    const response = h.response({
        status: "failed",
        message: "Failed to add note"
    });
    response.code(500);
    return Promise.reject(response);
}
exports.addNoteHandler = addNoteHandler;
function getNotesHandler() {
    return {
        status: "success",
        data: {
            notes: notes_1.notes
        }
    };
}
exports.getNotesHandler = getNotesHandler;
function getDetailNote(request, h) {
    const { id } = request.params;
    const note = notes_1.notes.filter(e => e.id === id)[0];
    if (note != undefined) {
        return {
            status: "success",
            data: {
                note
            }
        };
    }
    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
    });
    response.code(404);
    return response;
}
exports.getDetailNote = getDetailNote;
function editNoteHandler(request, h) {
    const { id } = request.params;
    const { title, tags, body } = request.payload;
    const updatedAt = new Date().toISOString();
    const index = notes_1.notes.findIndex((note) => note.id === id);
    if (index != -1) {
        notes_1.notes[index] = Object.assign(Object.assign({}, notes_1.notes[index]), { title,
            tags,
            body,
            updatedAt });
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
exports.editNoteHandler = editNoteHandler;
function deleteNote(request, h) {
    const { id } = request.params;
    const index = notes_1.notes.findIndex((note) => note.id === id);
    if (index !== -1) {
        notes_1.notes.splice(index, 1);
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
exports.deleteNote = deleteNote;
