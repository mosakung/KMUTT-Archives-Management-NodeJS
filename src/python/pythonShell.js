import { PythonShell } from 'python-shell'
import { once } from 'events'

const pythonShell = async () => {
  PythonShell.defaultOptions = { pythonPath: 'C:/Users/BearSouL/anaconda3/envs/NLP/python.exe' }

  const pyshell = new PythonShell(`${process.cwd()}/src/python/module-python/initializing.py`)

  pyshell.on('message', (message) => {
    // received a message sent from the Python script (a simple "print" statement)
    console.log(message)
  })

  pyshell.end((err, code) => {
    if (err) throw err
    console.log(`The exit code was: ${code}`)
    console.log('finished')
  })

  await once(pyshell, 'close')

  return 'end'
}

export default pythonShell
