import express from 'express'

const router = express.Router()

import redisAdapter from '../adapters/redis.mjs'

router.post('/users', async (req, res) => {
    if (!req.body.name || !req.body.password) {
        return res.status(400).send('Невалидные данные')
    }
    try {
        const doc = await redisAdapter.create(req.body)
        delete doc.password
        res.send(doc)
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

router.get('/users/:name', async (req, res) => {
    if (!req.params.name) {
        return res.status(400).send('Невалидные данные')
    }
    try {
        const user = JSON.parse(await redisAdapter.get(req.params.name))
        if (user) {
            delete user.password
            return res.send(user)
        }
        res.status(404).send('Пользователь не найден')
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

export default router