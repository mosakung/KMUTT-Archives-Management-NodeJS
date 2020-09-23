import dotenv from 'dotenv'
import fs from 'fs'

const envConfig = dotenv.parse(fs.readFileSync(`.env.${process.env.NODE_ENV}`))

Object.keys(envConfig).forEach((key) => {
  process.env[key] = envConfig[key]
})

export default dotenv
