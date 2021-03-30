const tableName = 'score'

export async function up(knex) {
  return knex.schema.createTable(tableName, (table) => {
    // PRIMARY
    table.increments('score_id').primary()
    // REQUIRE
    table.float('score_tf', 255, 4).notNullable()
    table.string('generate_by', 191).defaultTo('default').notNullable()
    // DETAIL
    table.float('score_tf_idf', 255, 4)
    // FOREIGN
    table.integer('index_term_word_id', 10).unsigned()
    table.integer('index_document_id', 10).unsigned()

    table.index('index_term_word_id')
    table.index('index_document_id')

    table.foreign('index_term_word_id').references('term_word_id').inTable('term_word')
    table.foreign('index_document_id').references('document_id').inTable('document')
    // REC
    table.integer('rec_status', 2).defaultTo(1).notNullable()
  })
}

export async function down(knex) {
  return knex.schema.dropTableIfExists(tableName)
}
