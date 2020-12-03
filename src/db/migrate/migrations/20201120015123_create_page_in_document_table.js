const tableName = 'page_in_document'

export async function up(knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('page_in_document_id').primary()
    table.integer('page_index', 191).notNullable()
    table.string('name', 191)
    table.integer('rec_status_confirm', 2).defaultTo(0).notNullable()
    table.integer('index_document_id', 10).unsigned().notNullable()
    table.index('index_document_id')
    table.foreign('index_document_id').references('document.document_id')
  })
}

export async function down(knex) {
  return knex.schema.dropTableIfExists(tableName)
}
