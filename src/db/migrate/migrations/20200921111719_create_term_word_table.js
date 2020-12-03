const tableName = 'term_word'

export async function up(knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('term_word_id').primary()
    table.string('term', 191).notNullable()
    table.integer('frequency', 255).notNullable()
    table.float('score_idf', 255, 4)
    table.datetime('rec_create_at', { precision: 6 }).defaultTo(knex.fn.now(6)).notNullable()
    table.datetime('rec_modified_at', { precision: 6 }).defaultTo(knex.fn.now(6)).notNullable()
  })
}

export async function down(knex) {
  return knex.schema.dropTableIfExists(tableName)
}
