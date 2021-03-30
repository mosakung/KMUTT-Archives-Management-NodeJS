const tableName = 'indexing_issued_date_document'

export async function up(knex) {
  return knex.schema.createTable(tableName, (table) => {
    // PRIMARY
    table.increments('indexing_issued_date_id').primary()
    // REQUIRE
    table.date('issued_date', { precision: 6 }).notNullable()
    table.integer('frequency', 191).notNullable()
  })
}

export async function down(knex) {
  return knex.schema.dropTableIfExists(tableName)
}
