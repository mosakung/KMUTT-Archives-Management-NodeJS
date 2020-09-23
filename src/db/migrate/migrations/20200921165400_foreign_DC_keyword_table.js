const tableName = 'DC_keyword'

export async function up(knex) {
  return knex.schema.alterTable(tableName, (table) => {
    table.index('index_document_id')
    table.foreign('index_document_id').references('document.document_id')
  })
}

export async function down(knex) {
  return knex.schema.alterTable(tableName, (table) => {
    table.dropForeign('index_document_id')
    table.dropIndex('index_document_id')
  })
}
