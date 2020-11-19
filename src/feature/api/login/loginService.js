import jwt from 'jsonwebtoken'
import passwordHash from 'password-hash'

import { queryUser, insertUser } from './loginRepository'

export const register = async (body) => {
  const parserInput = {
    username: body.username,
    password: passwordHash.generate(body.password),
    name: body.name,
    surname: body.surname,
    role: body.role,
  }
  try {
    await insertUser(parserInput)
    return true
  } catch (error) { return { error: error.details[0].message } }
}

export const login = (username) => queryUser({ username })

export const getTokenToStoreFunction = (password, user) => {
  if (passwordHash.verify(password, user.password)) {
    const token = jwt.sign(
      {
        id: user.id, name: user.name, surname: user.surname, role: user.role,
      }, process.env.SECRET,
      { expiresIn: '7d' },
    )
    return token
  }
  return null
}

export default { }
