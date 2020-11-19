import { login, register, getTokenToStoreFunction } from './loginService'

export const loginController = async (req, res) => {
  const { username, password } = req.body
  const existUser = username && password ? await login(username) : null
  if (!existUser) {
    return res.status(500).send({ message: 'incorrect username password' })
  }
  const result = getTokenToStoreFunction(password, existUser)
  if (result) {
    return res.send(result)
  }
  return res.status(500).send({ message: 'incorrect username password' })
}

export const registerController = async (req, res) => {
  const { body } = req

  if (req.headers.admin === 'nongped') {
    const { error } = await register(body)
    if (error) return res.status(400).send(error)
    return res.status(200).send('register complete')
  }
  return res.status(404).send()
}

export default {}
