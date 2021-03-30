const tableName = 'page_in_document'

export async function up(knex) {
  return knex.schema.createTable(tableName, (table) => {
    // PRIMARY
    table.increments('page_in_document_id').primary()
    // REQUIRE
    table.integer('page_index', 191).notNullable()
    // DETAIL
    table.string('name', 191)
    // FOREIGN
    table.integer('index_document_id', 10).unsigned().notNullable()
    table.index('index_document_id')
    table.foreign('index_document_id').references('document_id').inTable('document')
    // REC
    table.integer('rec_status_confirm', 191).defaultTo(0).notNullable()
  })
}

export async function down(knex) {
  return knex.schema.dropTableIfExists(tableName)
}
