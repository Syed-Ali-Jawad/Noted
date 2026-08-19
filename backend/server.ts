import { createApp } from "./app.js";
import { env } from "./src/config/env.js";

const server = createApp();

server.listen(env.port, () => { console.log("app running") });
