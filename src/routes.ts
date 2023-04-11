import { ReqRefDefaults, ServerRoute } from "@hapi/hapi";
import { addNoteHandler, deleteNote, editNoteHandler, getDetailNote, getNotesHandler } from "./handler";

const routes: ServerRoute<ReqRefDefaults>[] = [
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler,
    },
    {
        method: 'GET',
        path: '/notes',
        handler: getNotesHandler
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getDetailNote
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNoteHandler
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNote
    },

]

export default routes;