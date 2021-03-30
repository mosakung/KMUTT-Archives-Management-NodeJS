const tableName = 'user'

export async function up(knex) {
  return knex.schema.createTable(tableName, (table) => {
    // PRIMARY
    table.increments('user_id').primary()
    // REQUIRE
    table.string('username', 191).notNullable()
    table.string('password', 191).notNullable()
    table.string('role', 191).notNullable()
    // DETAIL
    table.string('name', 191)
    table.string('surname', 191)
    // REC
    table.datetime('create_at', { precision: 6 }).defaultTo(knex.fn.now(6)).notNullable()
    table.integer('active', 191).defaultTo(1).notNullable()
  })
}

export async function down(knex) {
  return knex.schema.dropTableIfExists(tableName)
}
