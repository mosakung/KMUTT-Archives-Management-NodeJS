const tableName = 'show_tag_in_document'

export async function up(knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('show_tag_in_document_id').primary()
    table.string('tag', 191).notNullable()
    table.integer('index_document_id', 10).unsigned().notNullable()
    table.index('index_document_id')
    table.foreign('index_document_id').references('document.document_id')
  })
}

export async function down(knex) {
  return knex.schema.dropTableIfExists(tableName)
}
