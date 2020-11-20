const tableName = 'document'

export async function up(knex) {
  return knex.schema.alterTable(tableName, (table) => {
    table.index('rec_create_by')
    table.index('rec_modified_by')
    table.foreign('rec_create_by').references('user.user_id')
    table.foreign('rec_modified_by').references('user.user_id')
  })
}

export async function down(knex) {
  return knex.schema.alterTable(tableName, (table) => {
    table.dropForeign('rec_create_by')
    table.dropIndex('rec_create_by')
    table.dropForeign('rec_modified_by')
    table.dropIndex('rec_modified_by')
  })
}
