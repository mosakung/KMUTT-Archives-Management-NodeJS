const tableName = 'document'

export async function up(knex) {
  return knex.schema.alterTable(tableName, (table) => {
    table.integer('page_start', 255).unsigned().notNullable()
    table.string('DC_coverage_temporal_year', 191)
  })
}

export async function down(knex) {
  return knex.schema.alterTable(tableName, (table) => {
    table.dropColumn('page_start')
    table.dropColumn('DC_coverage_temporal_year')
  })
}
