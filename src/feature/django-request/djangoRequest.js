import axios from 'axios'
import dotENV from '../../utils/setENV'
import manageLog from './manageLog'

dotENV.config()

const djangoRequest = { path: `${process.env.DJANGO_PATH}:${process.env.DJANGO_PORT}/` }
djangoRequest.post = async function post(path, body, requireData = false) {
  try {
    const response = await axios.post(this.path + path, body)
    const log = {
      status_code: response.status,
      header_date: response.headers.date,
      server: response.headers.server,
      url: response.config.url,
      content_type: response.headers['content-type'],
      rec_status: 1,
    }
    await manageLog.insert(log)

    if (requireData) { return { res: true, output: response.data } }

    return { res: true }
  } catch (err) {
    console.error(err.message)
    return { res: false }
  }
}
export default djangoRequest
