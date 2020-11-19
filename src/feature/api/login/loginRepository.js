import db from '../../../db/initializing'

const tableName = 'user'

export const queryUser = async (username) => {
  const result = await db.from(tableName)
    .where(username)
    .first()
  return result
}

export const insertUser = async (inputObj) => {
  const result = await db.from(tableName).insert(inputObj)
  return result
}

export default { }
