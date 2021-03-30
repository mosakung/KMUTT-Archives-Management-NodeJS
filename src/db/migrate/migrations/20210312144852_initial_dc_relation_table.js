const tableName = 'dc_relation'

export async function up(knex) {
  return knex.schema.createTable(tableName, (table) => {
    // PRIMARY
    table.increments('DC_relation_id').primary()
    // REQUIRE
    table.string('DC_relation', 191).notNullable()
    // FOREIGN
    table.integer('index_document_id', 10).unsigned().notNullable()
    table.index('index_document_id')
    table.foreign('index_document_id').references('document_id').inTable('document')
  })
}

export async function down(knex) {
  return knex.schema.dropTableIfExists(tableName)
}
