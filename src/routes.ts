import { ReqRefDefaults, ServerRoute } from "@hapi/hapi";
import { addNoteHandler } from "./handler";

const routes: ServerRoute<ReqRefDefaults>[] = [
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler,
    },

]

export default routes;