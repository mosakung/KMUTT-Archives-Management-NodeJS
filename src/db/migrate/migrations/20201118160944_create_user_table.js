const tableName = 'user'

export async function up(knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('user_id').primary()
    table.string('name', 191)
    table.string('surname', 191)
    table.string('role', 191)
    table.string('username', 191)
    table.string('password', 191)
    table.dateTime('create_at').defaultTo(knex.fn.now())
    table.integer('active').defaultTo(1)
  })
}

export async function down(knex) { return knex.schema.dropTableIfExists(tableName) }
