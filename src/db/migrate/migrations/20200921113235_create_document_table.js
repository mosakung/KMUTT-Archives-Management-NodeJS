const tableName = 'document'

export async function up(knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('document_id').primary()
    table.string('name', 191)
    table.integer('version', 255)
    table.text('path')
    table.string('DC_title', 191)
    table.string('DC_title_alternative', 191)
    table.text('DC_description_table_of_contents')
    table.text('DC_description_summary_or_abstract')
    table.text('DC_description_note')
    table.string('DC_format', 191)
    table.string('DC_format_extent', 191)
    table.string('DC_identifier_URL', 191)
    table.string('DC_identifier_ISBN', 191)
    table.string('DC_source', 191)
    table.string('DC_language', 191)
    table.string('DC_coverage_spatial', 191)
    table.string('DC_coverage_temporal', 191)
    table.string('DC_rights', 191)
    table.string('DC_rights_access', 191)
    table.string('thesis_degree_name', 191)
    table.string('thesis_degree_level', 191)
    table.string('thesis_degree_discipline', 191)
    table.string('thesis_degree_grantor', 191)
    table.datetime('rec_create_at', { precision: 6 }).defaultTo(knex.fn.now(6))
    table.string('rec_create_by', 191)
    table.datetime('rec_modified_at', { precision: 6 }).defaultTo(knex.fn.now(6))
    table.string('rec_modified_by', 191)
    table.integer('index_creator', 10).unsigned()
    table.integer('index_creator_orgname', 10).unsigned()
    table.integer('index_publisher', 10).unsigned()
    table.integer('index_contributor', 10).unsigned()
  })
}

export async function down(knex) {
  return knex.schema.dropTableIfExists(tableName)
}
