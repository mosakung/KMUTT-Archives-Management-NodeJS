import db from '../../db/initializing'

const manageLog = { tablename: 'nodejs_log' }

manageLog.insert = function insert(body) {
  return db.table(this.tablename).insert({
    status_code: body.status_code,
    header_date: body.header_date,
    server: body.server,
    url: body.url,
    content_type: body.content_type,
    rec_status: body.rec_status,
    rec_create_date: db.fn.now(),
  })
}

export default manageLog
