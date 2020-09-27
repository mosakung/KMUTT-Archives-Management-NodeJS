import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import readPython from './python/readPython'
import pythonShell from './python/pythonShell'

const app = express()

app.use(express.json())
app.use(cors())

readPython('./initializing.py', [`${process.cwd()}/src/documents/dummy`]).then((res) => {
  console.log(res)
})

/* pythonShell().then((res) => {
  console.log(res)
}) */

if (app.get('env') === 'development') {
  app.use(morgan('tiny'))
}

app.listen(3251, () => {
  console.log('\nserver running on port 3000')
  console.log('Terminate batch job (Ctrl + C)\n')
})
