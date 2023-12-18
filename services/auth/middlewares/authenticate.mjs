import adapter from '../adapters/redis.mjs'

const authenticate = async (req, res, next) => {
    console.log('auth')
    if (!req.headers.authorization) {
        return res.status(400).send('Не указан токен авторизации')
    }
    const token = req.headers.authorization.substring(7)
    req.user = await adapter.findByToken(token)

    if (!req.user){
        return res.status(404).send('Пользователь с таким токеном не найден')
    }

    return next()
}

export default authenticate
