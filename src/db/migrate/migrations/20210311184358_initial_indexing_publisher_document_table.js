const tableName = 'indexing_publisher_document'

export async function up(knex) {
  return knex.schema.createTable(tableName, (table) => {
    // PRIMARY
    table.increments('indexing_publisher_id').primary()
    // REQUIRE
    table.string('publisher', 191).notNullable()
    table.integer('frequency', 191).notNullable()
  })
}

export async function down(knex) {
  return knex.schema.dropTableIfExists(tableName)
}
