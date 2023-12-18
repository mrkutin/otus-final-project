import express from 'express'
const router = express.Router()

import adapter from '../adapters/redis.mjs'

router.post('/users', async (req, res) => {
    console.log(`${req.url} received ${JSON.stringify(req.body)}`)
    if (!req.body.name || !req.body.password) {
        return res.status(400).send('Невалидные данные')
    }
    try {
        const doc = req.body
        await adapter.create(doc)
        delete doc.password
        res.send(doc)
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

router.post('/login', async (req, res) => {
    if (!req.body.id || !req.body.password) {
        return res.status(400).send('Невалидные данные')
    }
    try {
        const token = await adapter.createToken(req.body.id, req.body.password)

        if (token) {
            return res.send({token})
        }
        res.status(404).send('Пользователь не найден')
    } catch (err) {
        console.log(err.message)
        return res.status(500).send('Ошибка сервера')
    }
})

import authenticate from '../middlewares/authenticate.mjs'
router.post('/users/authenticate', authenticate, (req, res) => {
    if(req.user) {
        const {password, ...user} = req.user
        return res.send(user)
    }

    return res.status(401).send('Пользователь не аутентифицирован')
})

export default router