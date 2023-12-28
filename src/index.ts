import { app } from "./app";
import { runDb } from "./db/db";

const PORT = 3000;


const startApp =async () => {
    await runDb()
    app.listen(PORT, () => {
        console.log(`App listening on port: ${PORT}`);
    })
}

startApp()