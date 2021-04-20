const tableName = 'dc_contributors'

export async function up(knex) {
  return knex.schema.alterTable(tableName, (table) => {
    table.integer('index_contributor_role_id', 10).unsigned().notNullable().after('index_contributor_id')
    table.index('index_contributor_role_id')
    table.foreign('index_contributor_role_id').references('indexing_contributor_role_id').inTable('indexing_contributor_role_document')
  })
}

export async function down(knex) {
  return knex.schema.alterTable(tableName, (table) => {
    table.dropForeign('index_contributor_role_id')
    table.dropIndex('index_contributor_role_id')
    table.dropColumn('index_contributor_role_id')
  })
}
