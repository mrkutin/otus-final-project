import axios from 'axios'

const AUTH_HOST = process.env.AUTH_HOST || '0.0.0.0'
const AUTH_PORT = process.env.AUTH_PORT || 3000

const authenticate = async (req, res, next) => {
    console.log('auth req.headers.authorization:', req.headers.authorization)

    if (req.headers.authorization) {
        try {
            const {data: user} = await axios.post(
                `http://${AUTH_HOST}:${AUTH_PORT}/users/authenticate`,
                {},
                {
                    headers: {
                        authorization: req.headers.authorization,
                        'x-request-id': req.headers['x-request-id']
                    }
                }
            )
            req.user = user
            return next()
        } catch (e) {
            console.log(e)
            return res.status(500).send(e.response?.data || e.messages)
        }
    }
}

export default authenticate
