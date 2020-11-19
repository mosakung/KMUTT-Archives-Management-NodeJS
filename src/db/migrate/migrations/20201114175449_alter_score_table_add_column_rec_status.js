const tableName = 'score'

export async function up(knex) {
  return knex.schema.alterTable(tableName, (table) => {
    table.integer('rec_status', 191).notNullable().defaultTo(1)
  })
}

export async function down(knex) {
  return knex.schema.alterTable(tableName, (table) => {
    table.dropColumn('rec_status')
  })
}
