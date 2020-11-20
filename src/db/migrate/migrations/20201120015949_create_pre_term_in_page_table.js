const tableName = 'pre_term_in_page'

export async function up(knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('pre_term_in_page_id').primary()
    table.string('pre_term', 191)
    table.integer('index_page_in_document_id', 10).unsigned()
    table.index('index_page_in_document_id')
    table.foreign('index_page_in_document_id').references('page_in_document.page_in_document_id')
  })
}

export async function down(knex) {
  return knex.schema.dropTableIfExists(tableName)
}
