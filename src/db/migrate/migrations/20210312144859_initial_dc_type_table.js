const tableName = 'dc_type'

export async function up(knex) {
  return knex.schema.createTable(tableName, (table) => {
    // PRIMARY
    table.increments('DC_type_id').primary()
    // REQUIRE
    table.string('DC_type', 191).notNullable()
    // FOREIGN
    table.integer('index_document_id', 10).unsigned().notNullable()
    table.index('index_document_id')
    table.foreign('index_document_id').references('document_id').inTable('document')
  })
}

export async function down(knex) {
  return knex.schema.dropTableIfExists(tableName)
}
