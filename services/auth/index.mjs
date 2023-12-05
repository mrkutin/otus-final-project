const PORT = parseInt(process.env.PORT) || 3000
import express from 'express'

import { createServer } from 'http'

// import authenticate from './middlewares/authenticate.mjs'
import users from './routers/users.mjs'

const app = express()

const httpServer = createServer(app)

app.use(express.json())
app.use(users)
// app.use(authenticate, users)

httpServer.listen(PORT, function () {
    console.log('Server listening at port %d', PORT);
});