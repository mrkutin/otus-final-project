import express from 'express'

const router = express.Router()
import users from '../adapters/users.mjs'

router.post('/users', async (req, res) => {
    if (!req.body.name || !req.body.password) {
        return res.status(400).send('Невалидные данные')
    }
    try {
        const user = await users.get({name: req.body.name})
        if (user) {
            return res.status(500).send(`Пользователь '${req.body.name}' уже существует`)
        }

        const user_id = await users.create(req.body)
        res.send({user_id})
    } catch (err) {
        console.log(err.message)
        return res.status(500).send('Ошибка сервера')
    }
})

router.post('/login', async (req, res) => {
    if (!req.body.id || !req.body.password) {
        return res.status(400).send('Невалидные данные')
    }
    try {
        const token = await users.authenticate(req.body.id, req.body.password)

        if (token) {
            return res.send({token})
        }
        res.status(404).send('Пользователь не найден')
    } catch (err) {
        console.log(err.message)
        return res.status(500).send('Ошибка сервера')
    }
})

router.get('/users/:id', async (req, res) => {
    if (!req.params.id) {
        return res.status(400).send('Невалидные данные')
    }
    try {
        const user = await users.get(req.params.id)
        if (user) {
            return res.send(user)
        }
        res.status(404).send('Анкета не найдена')
    } catch (err) {
        console.log(err.message)
        return res.status(500).send('Ошибка сервера')
    }
})

export default router