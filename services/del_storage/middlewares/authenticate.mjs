import users from '../adapters/users.mjs'

const authenticate = async (req, res, next) => {
    if (!req.headers.authorization) {
        return next()
        //todo return res.status(403).send('Access denied')
    }
    const token = req.headers.authorization.substring(7)
    req.user = await users.findByToken(token)
    return next()
}

export default authenticate
