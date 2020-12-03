const tableName = 'user'

export async function up(knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('user_id').primary()
    table.string('name', 191)
    table.string('surname', 191)
    table.string('role', 191).notNullable()
    table.string('username', 191).notNullable()
    table.string('password', 191)
    table.dateTime('create_at').defaultTo(knex.fn.now()).notNullable()
    table.integer('active').defaultTo(1).notNullable()
  })
}

export async function down(knex) { return knex.schema.dropTableIfExists(tableName) }
