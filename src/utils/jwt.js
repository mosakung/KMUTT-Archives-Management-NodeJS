import jwt from 'jsonwebtoken'

const jwtCheck = (auth) => {
  if (auth && auth.split(' ')[0] === 'Bearer') {
    const token = auth.split(' ')[1]
    try {
      const user = jwt.verify(token, process.env.SECRET)
      return user
    } catch (e) {
      return null
    }
  }
  return null
}

export default jwtCheck
