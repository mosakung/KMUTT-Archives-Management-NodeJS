const tableName = 'score'

export async function up(knex) {
  return knex.schema.alterTable(tableName, (table) => {
    table.index('index_term_word_id')
    table.index('index_document_id')
    table.foreign('index_term_word_id').references('term_word.term_word_id')
    table.foreign('index_document_id').references('document_id').inTable('document')
  })
}

export async function down(knex) {
  return knex.schema.alterTable(tableName, (table) => {
    table.dropForeign('index_term_word_id')
    table.dropForeign('index_document_id')
    table.dropIndex('index_term_word_id')
    table.dropIndex('index_document_id')
  })
}
