const tableName = 'indexing_creator_document'

export async function up(knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('indexing_creator_id').primary()
    table.string('creator', 191).notNullable()
    table.integer('frequency', 191).notNullable()
  })
}

export async function down(knex) {
  return knex.schema.dropTableIfExists(tableName)
}
