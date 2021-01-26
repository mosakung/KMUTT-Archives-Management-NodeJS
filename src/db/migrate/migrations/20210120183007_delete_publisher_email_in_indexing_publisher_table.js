const tableName = 'indexing_publisher_document'

export async function up(knex) {
  return knex.schema.alterTable(tableName, (table) => {
    table.dropColumn('publisher_email')
  })
}

export async function down(knex) {
  return knex.schema.alterTable(tableName, (table) => {
    table.string('publisher_email', 191).notNullable()
  })
}
