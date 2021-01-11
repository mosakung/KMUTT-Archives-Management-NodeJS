const tableName = 'document'

export async function up(knex) {
  return knex.schema.alterTable(tableName, (table) => {
    table.integer('amount_page', 255).unsigned().notNullable().defaultTo(0)
  })
}

export async function down(knex) {
  return knex.schema.alterTable(tableName, (table) => {
    table.dropColumn('amount_page')
  })
}
