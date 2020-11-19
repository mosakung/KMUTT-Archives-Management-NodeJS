const tableName = 'document'

export async function up(knex) {
  return knex.schema.alterTable(tableName, (table) => {
    table.integer('index_issued_date', 10).unsigned()
  })
}

export async function down(knex) {
  return knex.schema.alterTable(tableName, (table) => {
    table.dropColumn('index_issued_date')
  })
}
