const tableName = 'dc_contributors'

export async function up(knex) {
  return knex.schema.createTable(tableName, (table) => {
    // PRIMARY
    table.increments('DC_contributors_id').primary()
    // FOREIGN
    table.integer('index_contributor_id', 10).unsigned().notNullable()
    table.index('index_contributor_id')
    table.foreign('index_contributor_id').references('indexing_contributor_id').inTable('indexing_contributor_document')

    table.integer('index_document_id', 10).unsigned().notNullable()
    table.index('index_document_id')
    table.foreign('index_document_id').references('document_id').inTable('document')
  })
}

export async function down(knex) {
  return knex.schema.dropTableIfExists(tableName)
}
