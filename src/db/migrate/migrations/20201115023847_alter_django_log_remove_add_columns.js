const tableName = 'django_log'

export async function up(knex) {
  return knex.schema.alterTable(tableName, (table) => {
    table.dropColumn('header_date')
    table.dropColumn('server')
    table.dropColumn('url')
    table.dropColumn('content_type')
    table.dropColumn('status_code')
    table.string('log_error', 191)
    table.integer('index_document', 10).unsigned()
    table.foreign('index_document').references('document_id').inTable('document')
  })
}

export async function down(knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.integer('status_code', 191)
    table.string('header_date', 191)
    table.string('server', 191)
    table.string('url', 191)
    table.string('content_type', 191)
    table.dropColumn('log_error')
    table.dropForeign('index_document')
    table.dropColumn('index_document')
  })
}
