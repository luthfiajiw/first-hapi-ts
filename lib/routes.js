"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = require("./handler");
const routes = [
    {
        method: 'POST',
        path: '/notes',
        handler: handler_1.addNoteHandler,
    },
    {
        method: 'GET',
        path: '/notes',
        handler: handler_1.getNotesHandler
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: handler_1.getDetailNote
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: handler_1.editNoteHandler
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: handler_1.deleteNote
    },
];
exports.default = routes;
