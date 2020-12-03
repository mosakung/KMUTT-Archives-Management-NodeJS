const tableName = 'indexing_creator_orgname_document'

export async function up(knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('indexing_creator_orgname_id').primary()
    table.string('creator_orgname', 191).notNullable()
    table.integer('frequency', 191).notNullable()
  })
}

export async function down(knex) {
  return knex.schema.dropTableIfExists(tableName)
}
