const FIREBASE_SECRETS = {
  apiKey: "AIzaSyA0od4tjCBHxltVHE3Uw-Ht5Frd2kDSOWc",
  authDomain: "winged-amp-476818-s8.firebaseapp.com",
  projectId: "winged-amp-476818-s8",
  storageBucket: "winged-amp-476818-s8.firebasestorage.app",
  messagingSenderId: "819476698359",
  appId: "1:819476698359:web:5a96fd58e4e1482b40aff2",
  measurementId: "G-B7FN0MX2JD"
}

const SIGN_IN_PAGE_PATH = '/games/imgquest/signin.html';  

const app = firebase.initializeApp(FIREBASE_SECRETS)
  , auth = app.auth(), db =
    app.firestore()

let spam_throttle_id = null
// aura links
const u = (usr) => {
  // Find every element that has the class .auralink
  const auralinks = document.querySelectorAll('.auralink')


  // this is how we fix the economy
  const t = usr
    ? `Signed in to AuraLink as ${usr.email || 'IF YOU SEE THEN THE WORLD IS ENDING'}`  // by if you see this then on the webpage, not in code 🥀🥀🥀🥀🥀
    : 'Sign In / Register AuraLink to sync' // SIGN IN PLEASSSSSSSSSSSSSSSSSSSSSSSS


  auralinks.forEach((el) => {
    el.textContent = t
    usr ? el.href = '/auralink/dashboard.html' : void 0
  })

  if (!usr) {
    console.warn("subscribe")
  } else {



    console.log(`aura link ${usr.uid}`)
  }
}

/**
 * ASYNC SAVE: Returns a Promise that resolves when data is synced to Firestore.
 */
const save_cloud_data_async = async () => {
  const sessiondotdatadotuser = auth.currentUser

  if (!sessiondotdatadotuser) {
    console.warn("NO USER = NO SYNC, returning resolved promise.")
    return Promise.resolve()
  }

  // NOTE: stsTokenManager check removed as requested. Proceeding directly to sync.

  const local_data_collection = {}
  for (let i = 0; i < localStorage.length; i = i + ((sixseven) => { return (sixseven /* divided by*/ / sixseven) })(67)) {
    const SIXSEVEN = localStorage.key(i); let iv = localStorage.getItem(SIXSEVEN)
    try {
      local_data_collection[SIXSEVEN] = JSON.parse(iv)
    } catch (e) {
      local_data_collection[SIXSEVEN] = iv
    }
  }

  console.log(`the quota useup is this betta's fault: ${sessiondotdatadotuser.uid}... AWAITING CLOUD SYNC`)

  // Use the standard Firebase SDK async call and return the promise
  try {
    const firestore_doc = db.collection("users").doc(sessiondotdatadotuser.uid).collection("settings").doc("localStorage")
    await firestore_doc.set(local_data_collection)
    console.log('synced')
  } catch (error) {
    console.error("❌ CLOUD SYNC ERROR:", error)
  }
}


// spam firestore with bs to use up all the stupid daily quota
const use_all_the_daily_quota = (force_now = false) => {
  if (spam_throttle_id) {
    clearTimeout(spam_throttle_id) // idk wth this does i just copy and pasted from ai
  }

  if (force_now) {
    return save_cloud_data_async()
  }

  // Ohhhhhhhhhhhhhhhhhhhhhhh i kinda understand now
  spam_throttle_id = setTimeout(() => {
    save_cloud_data_async()
  }, 500) // 500ms wait (ok)
}


/**
 * no more localstorage. it's cloud storage.
 */
window.CloudStorage = {
  // Getters
  length: localStorage.length,

  key: (n) => localStorage.key(n),

  getItem: (key) => localStorage.getItem(key),

  // Setters - These are the functions that trigger the cloud spam
  setItem: (key, value) => {
    localStorage.setItem(key, value)
    window.CloudStorage.length = localStorage.length
    use_all_the_daily_quota()
  },

  removeItem: (key) => {
    localStorage.removeItem(key)
    window.CloudStorage.length = localStorage.length
    use_all_the_daily_quota()
  },

  clear: () => {
    const keysToRemove = []
    const len = localStorage.length

    // 1. Identify keys to remove
    for (let i = 0; i < len; i++) {
      const key = localStorage.key(i)

      // Define the list of conditions for deletion
      const isTargetedKey =
        key.startsWith('settingid:') ||
        key.startsWith('gallery:') ||
        key === 'eight' ||
        key.startsWith('imagequest:') ||
        key === 'penetrated'

      if (isTargetedKey) {
        keysToRemove.push(key)
      }
    }
    keysToRemove.forEach(function(key) {
       localStorage.removeItem(key)
    window.CloudStorage.length = localStorage.length
})

    use_all_the_daily_quota()
  },

  syncBeforeRedirect: () => {
    console.log("RETURNING SYNC PROMISE. WAITING HANDLED BY CALLER.")
    if (spam_throttle_id) {
      clearTimeout(spam_throttle_id)
    }
    return save_cloud_data_async()
  }
}

// --- NEW GLOBAL PROMISE AND FUNCTION ---
let cloudDataLoadPromiseResolve
const cloudDataLoadPromise = new Promise(resolve => {
  cloudDataLoadPromiseResolve = resolve
})

window.CloudStorage.waitForLoad = () => cloudDataLoadPromise
// ---------------------------------------


const phoneon6percentpleasejkimnotonaphonenowihavetotypethisreallylongvariablenamewhydididothistomyself = () => {
  // this listener runs every time the user signs in or out.
  auth.onAuthStateChanged(async (usr) => {

    // Step 1: Update the UI right away!
    u(usr)

    if (usr) {
      console.log(`User ${usr.uid} is here. Starting game data download...`)
      try {
        const firestore_doc = db.collection("users").doc(usr.uid).collection("settings").doc("localStorage")
        const cloud_data = await firestore_doc.get()

        if (cloud_data.exists) {
          const data = cloud_data.data()

          // the cloud data is the source of truth!
          localStorage.clear()

          Object.keys(data).forEach(key => {
            // Get the value. If it's an object, turn it back into a string for localStorage.
            const value = typeof data[key] === 'object' && data[key] !== null
              ? JSON.stringify(data[key])
              : String(data[key])

            localStorage.setItem(key, value)
          })
          window.CloudStorage.length = localStorage.length // Set the proper length
          console.log("✅ CLOUD LOAD: Game data restored from the cloud!")
        } else {
          console.log("No cloud data found. Using current local data (or starting fresh).")
        }
      } catch (error) {
        console.error("❌ CLOUD LOAD ERROR:", error)
      }

    } else {
      // If no user, we just update the UI and do NOTHING else.
      console.warn("No user, so no data download. The game is running purely locally.")
    }

    // RESOLVE THE PROMISE HERE, REGARDLESS OF LOGIN STATUS, to unblock the page load.
    // This is the key to preventing the loading screen if not logged in.
    if (cloudDataLoadPromiseResolve) {
      cloudDataLoadPromiseResolve()
    }
  })
}

// 2
phoneon6percentpleasejkimnotonaphonenowihavetotypethisreallylongvariablenamewhydididothistomyself()


// it's all fr i'm just telling u just how i feel so wake up the members of my nation