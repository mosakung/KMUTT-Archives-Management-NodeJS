const tableName = 'indexing_contributor_document'

export async function up(knex) {
  return knex.schema.alterTable(tableName, (table) => {
    table.dropColumn('contributor_role')
  })
}

export async function down(knex) {
  return knex.schema.alterTable(tableName, (table) => {
    table.string('contributor_role', 191)
  })
}
