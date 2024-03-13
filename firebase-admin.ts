import { applicationDefault, cert, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const app = initializeApp({
  credential:
      process.env.USE_DEFAULT_SERVICE_ACCOUNT === 'true'
        ? applicationDefault()
        : cert(process.env.FIREBASE_ADMINSDK ?? '')
})

getFirestore().settings({ ignoreUndefinedProperties: true })

export default app
