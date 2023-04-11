import { ReqRefDefaults, ServerRoute } from "@hapi/hapi";
import { addNoteHandler, getNotesHandler } from "./handler";

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
    }

]

export default routes;