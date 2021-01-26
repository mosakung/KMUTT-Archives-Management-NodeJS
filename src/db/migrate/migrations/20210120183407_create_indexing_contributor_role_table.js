const tableName = 'indexing_contributor_role_document'

export async function up(knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('indexing_contributor_role_id').primary()
    table.string('contributor_role', 191).notNullable()
    table.integer('index_contributor', 10).unsigned().notNullable()
    table.index('index_contributor')
    table.foreign('index_contributor').references('indexing_contributor_document.indexing_contributor_id')
  })
}

export async function down(knex) {
  return knex.schema.dropTableIfExists(tableName)
}
