import { getAuth } from 'firebase-admin/auth'

export default defineEventHandler((event) => {
  const auth = getAuth()
  return auth.deleteUser(event.context.claims.uid)
})
