const tableName = 'pre_term_in_page'

export async function up(knex) {
  return knex.schema.createTable(tableName, (table) => {
    // PRIMARY
    table.increments('pre_term_in_page_id').primary()
    // REQUIRE
    table.string('pre_term', 191).notNullable()
    // FOREIGN
    table.integer('index_page_in_document_id', 10).unsigned().notNullable()
    table.index('index_page_in_document_id')
    table.foreign('index_page_in_document_id').references('page_in_document_id').inTable('page_in_document')
  })
}

export async function down(knex) {
  return knex.schema.dropTableIfExists(tableName)
}
