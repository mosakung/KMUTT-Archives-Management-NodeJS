const tableName = 'score'

export async function up(knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('score_id').primary()
    table.float('score_tf', 255, 4)
    table.float('score_tf_idf', 255, 4)
    table.integer('index_term_word_id', 10).unsigned()
    table.integer('index_document_id', 10).unsigned()
  })
}

export async function down(knex) {
  return knex.schema.dropTableIfExists(tableName)
}
