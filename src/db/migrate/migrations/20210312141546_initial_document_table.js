const tableName = 'document'

export async function up(knex) {
  return knex.schema.createTable(tableName, (table) => {
    // PRIMARY
    table.increments('document_id').primary()
    // REQUIRE
    table.integer('status_process_document', 2).defaultTo(0).notNullable()
    table.integer('version', 191).notNullable()
    table.integer('page_start', 191).notNullable()
    table.integer('amount_page', 191).defaultTo(0).notNullable()

    table.text('path').notNullable()
    table.text('path_image').notNullable()

    table.string('name', 191).notNullable()
    table.string('DC_title', 191).notNullable()
    // DETAIL
    table.string('DC_title_alternative', 191)

    table.string('DC_description_table_of_contents', 191)
    table.string('DC_description_note', 191)
    table.string('DC_description_summary', 191)
    table.string('DC_description_abstract', 191)

    table.string('DC_format', 191)
    table.string('DC_format_extent', 191)

    table.string('DC_identifier_URL', 191)
    table.string('DC_identifier_ISBN', 191)

    table.string('DC_source', 191)
    table.string('DC_language', 191)

    table.string('DC_coverage_spatial', 191)
    table.string('DC_coverage_temporal', 191)
    table.string('DC_coverage_temporal_year', 191)

    table.string('DC_rights', 191)
    table.string('DC_rights_access', 191)

    table.string('thesis_degree_name', 191)
    table.string('thesis_degree_level', 191)
    table.string('thesis_degree_discipline', 191)
    table.string('thesis_degree_grantor', 191)
    // FOREIGN
    table.integer('index_creator', 10).unsigned()
    table.integer('index_creator_orgname', 10).unsigned()
    table.integer('index_publisher', 10).unsigned()
    table.integer('index_publisher_email', 10).unsigned()
    table.integer('index_issued_date', 10).unsigned()

    table.index('index_creator')
    table.index('index_creator_orgname')
    table.index('index_publisher')
    table.index('index_publisher_email')
    table.index('index_issued_date')

    table.foreign('index_creator').references('indexing_creator_id').inTable('indexing_creator_document')
    table.foreign('index_creator_orgname').references('indexing_creator_orgname_id').inTable('indexing_creator_orgname_document')
    table.foreign('index_publisher').references('indexing_publisher_id').inTable('indexing_publisher_document')
    table.foreign('index_publisher_email').references('indexing_publisher_email_id').inTable('indexing_publisher_email_document')
    table.foreign('index_issued_date').references('indexing_issued_date_id').inTable('indexing_issued_date_document')

    // REC
    table.datetime('rec_create_at', { precision: 6 }).defaultTo(knex.fn.now(6)).notNullable()
    table.integer('rec_create_by', 10).unsigned().notNullable()
    table.index('rec_create_by')
    table.foreign('rec_create_by').references('user_id').inTable('user')
    table.datetime('rec_modified_at', { precision: 6 }).defaultTo(knex.fn.now(6)).notNullable()
    table.integer('rec_modified_by', 10).unsigned().notNullable()
    table.index('rec_modified_by')
    table.foreign('rec_modified_by').references('user_id').inTable('user')
    table.integer('rec_status', 2).defaultTo(1).notNullable()
  })
}

export async function down(knex) {
  return knex.schema.dropTableIfExists(tableName)
}
