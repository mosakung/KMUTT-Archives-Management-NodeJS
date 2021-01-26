const tableName = 'document'

export async function up(knex) {
  return knex.schema.alterTable(tableName, (table) => {
    table.integer('index_publisher_email', 10).unsigned()
    table.index('index_publisher_email')
    table.foreign('index_publisher_email').references('indexing_publisher_email_document.indexing_publisher_email_id')
  })
}

export async function down(knex) {
  return knex.schema.alterTable(tableName, (table) => {
    table.dropForeign('index_publisher_email')
    table.dropIndex('index_publisher_email')
    table.dropColumn('index_publisher_email')
  })
}
