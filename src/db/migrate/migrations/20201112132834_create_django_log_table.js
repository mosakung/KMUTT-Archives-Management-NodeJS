const tableName = 'django_log'

export async function up(knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('django_log_id').primary()
    table.integer('status_code', 191)
    table.string('header_date', 191)
    table.string('server', 191)
    table.string('url', 191)
    table.string('content_type', 191)
    table.integer('rec_status', 191)
    table.datetime('rec_create_date', { precision: 6 }).defaultTo(knex.fn.now(6))
  })
}

export async function down(knex) {
  return knex.schema.dropTableIfExists(tableName)
}
