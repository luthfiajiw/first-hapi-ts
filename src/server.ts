'use strict'

import Hapi, { Server } from "@hapi/hapi";
import routes from "./routes";

async function init(): Promise<void> {
    const server: Server = Hapi.server({
        port: 3000,
        host: "localhost"
    })

    server.route(routes)
    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
}

init()