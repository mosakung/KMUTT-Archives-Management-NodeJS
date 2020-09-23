const tableName = 'document'

export async function up(knex) {
  return knex.schema.alterTable(tableName, (table) => {
    table.index('index_creator')
    table.index('index_creator_orgname')
    table.index('index_publisher')
    table.index('index_contributor')
    table.foreign('index_creator').references('indexing_creator_document.indexing_creator_id')
    table.foreign('index_creator_orgname').references('indexing_creator_orgname_id').inTable('indexing_creator_orgname_document')
    table.foreign('index_publisher').references('indexing_publisher_id').inTable('indexing_publisher_document')
    table.foreign('index_contributor').references('indexing_contributor_id').inTable('indexing_contributor_document')
  })
}

export async function down(knex) {
  return knex.schema.alterTable(tableName, (table) => {
    table.dropForeign('index_creator')
    table.dropForeign('index_creator_orgname')
    table.dropForeign('index_publisher')
    table.dropForeign('index_contributor')
    table.dropIndex('index_creator')
    table.dropIndex('index_creator_orgname')
    table.dropIndex('index_publisher')
    table.dropIndex('index_contributor')
  })
}
