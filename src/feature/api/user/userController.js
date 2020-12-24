export const queryUserInformationController = async (context) => {
  const { user } = context
  const result = {
    userId: user.id,
    name: user.name,
    surname: user.surname,
    role: user.role,
  }
  return result
}

export default { }
