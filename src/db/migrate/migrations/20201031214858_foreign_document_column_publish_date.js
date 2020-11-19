const tableName = 'document'

export async function up(knex) {
  return knex.schema.alterTable(tableName, (table) => {
    table.index('index_issued_date')
    table.foreign('index_issued_date').references('indexing_issued_date_id').inTable('indexing_issued_date_document')
  })
}

export async function down(knex) {
  return knex.schema.alterTable(tableName, (table) => {
    table.dropForeign('index_issued_date')
    table.dropIndex('index_issued_date')
  })
}
