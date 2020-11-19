const tableName = 'score'

export async function up(knex) {
  return knex.schema.alterTable(tableName, (table) => {
    table.string('generate_by', 191).notNullable().defaultTo('default')
  })
}

export async function down(knex) {
  return knex.schema.alterTable(tableName, (table) => {
    table.dropColumn('generate_by')
  })
}
