const tableName = 'DC_type'

export async function up(knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('DC_type_id').primary()
    table.string('DC_type', 191).notNullable()
    table.integer('index_document_id', 10).unsigned().notNullable()
  })
}

export async function down(knex) {
  return knex.schema.dropTableIfExists(tableName)
}
