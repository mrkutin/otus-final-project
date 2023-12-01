import express from 'express'

const router = express.Router()
import licenses from '../adapters/licenses.mjs'

router.post('/users/:user_id/licenses', async (req, res) => {
    if (!req.user) {
        return res.status(401).send('Пользователь не аутентифицирован')
    }
    if (!req.params.user_id || !req.body.text) {
        return res.status(400).send('Невалидные данные')
    }
    try {
        await licenses.create(req.user.city, req.user._id, req.params.user_id, req.body.text)
        res.send('OK')
    } catch (err) {
        console.log(err.message)
        return res.status(500).send('Ошибка сервера')
    }
})

router.get('/users/:user_id/licenses', async (req, res) => {
    if (!req.user) {
        return res.status(401).send('Пользователь не аутентифицирован')
    }
    if (!req.params.user_id) {
        return res.status(400).send('Невалидные данные')
    }
    try {
        const anotherUser = await users.get(req.params.user_id)

        const result = await Promise.all([
            dialogs.search(req.user.city, req.user._id, req.params.user_id),//выполняется на одном шарде
            dialogs.search(anotherUser.city, anotherUser._id, req.user._id)//выполняется на другом шарде
        ])

        const dialog = result[0].concat(result[1]).sort((a, b) => {
            if (a._id < b._id) {
                return -1
            } else if (a._id > b._id) {
                return 1
            }
            return 0
        })

        return res.send(dialog)
    } catch (err) {
        console.log(err.message)
        return res.status(500).send('Ошибка сервера')
    }
})

export default router