import express from 'express'
const router = express.Router()

import {v4 as uuid} from 'uuid'

import redisAdapter from '../adapters/redis.mjs'
import authenticate from '../middlewares/authenticate.mjs'

router.post('/users/:id/licenses', authenticate, async (req, res) => {
    console.log(`${req.url} received ${JSON.stringify(req.body)}`)
    try {
        const doc = req.body

        if(!doc.id){
            doc.id = uuid()
        }

        doc.user_id = req.params.id

        await redisAdapter.create(doc)

        res.send(doc)
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

export default router