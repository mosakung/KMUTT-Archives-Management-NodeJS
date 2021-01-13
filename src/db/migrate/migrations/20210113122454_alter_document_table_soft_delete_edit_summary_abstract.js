const tableName = 'document'

export async function up(knex) {
  return knex.schema.alterTable(tableName, (table) => {
    table.dropColumn('DC_description_summary_or_abstract')
    table.text('DC_description_summary')
    table.text('DC_description_abstract')
    table.integer('rec_status', 2).defaultTo(1).notNullable()
  })
}

export async function down(knex) {
  return knex.schema.alterTable(tableName, (table) => {
    table.text('DC_description_summary_or_abstract')
    table.dropColumn('DC_description_summary')
    table.dropColumn('DC_description_abstract')
    table.dropColumn('rec_status')
  })
}
