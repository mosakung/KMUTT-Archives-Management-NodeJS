const tableName = 'indexing_publisher_document'

export async function up(knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('indexing_publisher_id').primary()
    table.string('publisher', 191).notNullable()
    table.string('publisher_email', 191)
    table.integer('frequency', 191).notNullable()
  })
}

export async function down(knex) {
  return knex.schema.dropTableIfExists(tableName)
}
