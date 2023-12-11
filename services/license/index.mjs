const PORT = parseInt(process.env.PORT) || 3001
import express from 'express'

import { createServer } from 'http'

// import authenticate from './middlewares/authenticate.mjs'
import licenses from './routers/licenses.mjs'

const app = express()

const httpServer = createServer(app)

app.use(express.json())
app.use(licenses)
// app.use(authenticate, users)

httpServer.listen(PORT, function () {
    console.log('Server listening at port %d', PORT);
});