const tableName = 'indexing_contributor_document'

export async function up(knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('indexing_contributor_id').primary()
    table.string('contributor', 191).notNullable()
    table.string('contributor_role', 191)
    table.integer('frequency', 191).notNullable()
  })
}

export async function down(knex) {
  return knex.schema.dropTableIfExists(tableName)
}
