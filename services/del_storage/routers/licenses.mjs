import express from 'express'

const router = express.Router()
import licenses from '../adapters/licenses.mjs'
import users from "../adapters/users.mjs";

router.post('/users/:user_id/licenses', async (req, res) => {
    try {
        const user = await users.get({name: req.body.name})
        if (user) {
            return res.status(500).send(`Пользователь '${req.body.name}' уже существует`)
        }

        const user_id = await users.create(req.body)
        res.send({user_id})
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

router.get('/users/:user_id/licenses', async (req, res) => {
    if (!req.params.id) {
        return res.status(400).send('Невалидные данные')
    }
    try {
        const user = await users.get({_id: req.params.id})
        if (user) {
            return res.send(user)
        }
        res.status(404).send('Пользователь не найден')
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

export default router