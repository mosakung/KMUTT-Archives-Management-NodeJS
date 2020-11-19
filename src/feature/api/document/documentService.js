import djangoRequest from '../../django-request/djangoRequest'

export const insertDocumentService = async (document) => {
  const objectBody = {
    document,
  }
  const apiInsertDocument = 'add-document/'
  const result = await djangoRequest.post(apiInsertDocument, objectBody, true)
  if (result.res) {
    const { status, message, prevBody } = {
      status: result.output.status,
      message: result.output.message,
      prevBody: result.output.prev_body.document,
    }
    prevBody.addVersion = prevBody.add_version
    return { status, message, prevBody }
  }
  return false
}

export default {}
