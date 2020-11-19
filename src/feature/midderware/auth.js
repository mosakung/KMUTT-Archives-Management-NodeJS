import jwtCheck from '../../utils/jwt'

const exceptPath = ['/login', '/register', '/ping', '/graphql']

const isAuthenticated = async (req, res, next) => {
  if (!exceptPath.includes(req.path)) {
    const authenticated = await jwtCheck(req.headers.authorization)
    if (authenticated) {
      return next()
    }

    return res.status(500).send({ message: 'TOKEN_FAIL' })
  }
  return next()
}

export default isAuthenticated
