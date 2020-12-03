const tableName = 'DC_relation'

export async function up(knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('DC_relation_id').primary()
    table.string('DC_relation', 191).notNullable()
    table.integer('index_document_id', 10).unsigned().notNullable()
  })
}

export async function down(knex) {
  return knex.schema.dropTableIfExists(tableName)
}
