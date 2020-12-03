const tableName = 'indexing_issued_date_document'

export async function up(knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('indexing_issued_date_id').primary()
    table.date('issued_date', 191).notNullable()
    table.integer('frequency', 191).notNullable()
  })
}

export async function down(knex) {
  return knex.schema.dropTableIfExists(tableName)
}
