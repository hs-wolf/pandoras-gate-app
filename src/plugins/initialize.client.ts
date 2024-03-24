import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(({ hook }) => {
  const config = useRuntimeConfig()
  const { firebase } = config.public
  console.log("Keys", firebase)
  const app = initializeApp({ ...firebase })
  const auth = getAuth(app)

  hook('app:suspense:resolve', () => {
    const pinia = usePinia()
    const localesStore = useLocalesStore(pinia)
    const characterSheetStore = useCharacterSheetStore(pinia)

    localesStore.loadLocale()
    characterSheetStore.loadCharacter()

    onAuthStateChanged(auth, (user) => {
      try {
        if (user) {
          console.log(user)
        }
      } catch (error) {
        console.log(error)
      }
    })
  })

  return {
    provide: {
      firebaseApp: app,
      firebaseAuth: auth
    }
  }
})
