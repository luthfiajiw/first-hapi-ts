"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotesHandler = exports.addNoteHandler = void 0;
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
