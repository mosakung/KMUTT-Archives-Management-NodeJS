import { spawn } from 'child_process'
import { once } from 'events'

const readPython = async (file, param = []) => {
  const uint8arrayToString = (data) => String.fromCharCode.apply(null, data)

  const child = spawn('C:/Users/BearSouL/anaconda3/envs/NLP/python.exe', [`${process.cwd()}/src/python/module-python${file}`, ...param])

  const childResult = []

  child.stdout.on('data', (data) => {
    const result = uint8arrayToString(data).split('\r\n')
    childResult.push({ result })
  })

  child.stderr.on('data', (err) => {
    const error = uint8arrayToString(err)
    childResult.push({ error })
  })

  child.on('exit', (code) => {
    childResult.push({ endcode: `Process quit with code : ${code}` })
  })

  await once(child, 'close')

  return childResult
}

export default readPython
