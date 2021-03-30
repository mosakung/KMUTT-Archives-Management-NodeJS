const tableName = 'indexing_contributor_role_document'

export async function up(knex) {
  return knex.schema.createTable(tableName, (table) => {
    // PRIMARY
    table.increments('indexing_contributor_role_id').primary()
    // REQUIRE
    table.string('contributor_role', 191).notNullable()
    // FOREIGN
    table.integer('index_contributor', 10).unsigned().notNullable()
    table.index('index_contributor')
    table.foreign('index_contributor').references('indexing_contributor_id').inTable('indexing_contributor_document')
  })
}

export async function down(knex) {
  return knex.schema.dropTableIfExists(tableName)
}
