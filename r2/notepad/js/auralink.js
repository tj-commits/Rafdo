$(document).ready(function() {
    
    const firebaseConfig = {
        apiKey: "AIzaSyA0od4tjCBHxltVHE3Uw-Ht5Frd2kDSOWc",
        authDomain: "winged-amp-476818-s8.firebaseapp.com",
        projectId: "winged-amp-476818-s8",
        storageBucket: "winged-amp-476818-s8.firebasestorage.app",
        messagingSenderId: "819476698359",
        appId: "1:819476698359:web:c41dd94d52607ea440aff2",
        measurementId: "G-97GWD74F3Y"
    }
    const app = firebase.initializeApp(firebaseConfig)
    const auth = app.auth()
    const db = app.firestore()

    let currentAuraLinkUID = null
    let currentAuraLinkEmail = null
    let currentSyncStatus = null
    const auralinkStatusElement = document.getElementById('auralink_status')

    // --- DOM ELEMENTS ---
    const auralinkLoginModal = $('#auralink_login_modal')
    const auralinkRegisterModal = $('#auralink_register_modal')
    const auralinkStatusPanel = $('#auralink_status_panel')

    // Sign In Form Elements
    const auralinkSigninForm = $('#auralink_signin_form')
    const auralinkSigninEmailInput = $('#auralink_signin_email')
    const auralinkSigninPasswordInput = $('#auralink_signin_password')
    const auralinkSigninErrorElement = $('#auralink_signin_error')

    // Register Form Elements
    const auralinkRegisterForm = $('#auralink_register_form')
    const auralinkRegisterEmailInput = $('#auralink_register_email')
    const auralinkRegisterPasswordInput = $('#auralink_register_password')
    const auralinkRegisterErrorElement = $('#auralink_register_error')
    const auralinkShowRegisterBtn = $('#auralink_show_register_btn')
    const auralinkShowSigninBtn = $('#auralink_show_signin_btn')
    // --- END DOM ELEMENTS ---


    const panelUserStatus = $('#panel_user_status')
    const panelSyncDetails = $('#panel_sync_details')
    const panelLogoutBtn = $('#auralink_panel_logout_btn')

    let saveTimer = null
    const SAVE_DELAY_MS = 1500

    const SYNC_STATUS = {
        SIGNED_OUT: 'SIGNED_OUT',
        SYNCING: 'SYNCING',
        SYNCED: 'SYNCED',
        ERROR: 'ERROR'
    }
    const getNoteKeys = () => {
        const keys = []
        for (let i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i)
            if (key.startsWith('note-')) keys.push(key)
        }
        return keys
    }

    const getDisplaySyncStatus = (status) => {
        switch (status) {
            case SYNC_STATUS.SYNCED:
                return 'Fully Synced'
            case SYNC_STATUS.SYNCING:
                return 'Syncing...'
            case SYNC_STATUS.ERROR:
                return 'Error Occurred'
            default:
                return 'N/A'
        }
    }

    const updateStatusPanelContent = () => {
        const displayStatus = getDisplaySyncStatus(currentSyncStatus)
        panelUserStatus.text(`Status: Signed in as ${currentAuraLinkEmail}`)
        panelSyncDetails.html(`Current Sync: <strong>${displayStatus}</strong>`)
    }

    const showStatusPanel = () => {
        hideAuraLinkModals()
        updateStatusPanelContent()
        auralinkStatusPanel.addClass('open')
        $('.mask').addClass('open')
    }

    const setSyncStatus = (status) => {
        currentSyncStatus = status

        auralinkStatusElement.style.display = 'block'
        auralinkStatusElement.style.fontWeight = '700'

        const wasPanelOpen = auralinkStatusPanel.hasClass('open')

        if (status === SYNC_STATUS.SIGNED_OUT) {
            auralinkStatusElement.onclick = showLoginModal
            auralinkStatusElement.style.color = '#6d9bff'
            auralinkStatusElement.innerHTML = `☁️ AuraLink: Sign In`
            auralinkStatusElement.style.cursor = 'pointer'
        } else {
            auralinkStatusElement.onclick = showStatusPanel

            switch (status) {
                case SYNC_STATUS.SYNCING:
                    const syncText = currentAuraLinkEmail ? `AuraLink: Syncing as ${currentAuraLinkEmail}...` : 'Syncing Notes...'
                    auralinkStatusElement.innerHTML = `🔄 <strong>${syncText}</strong>`
                    auralinkStatusElement.style.color = '#6d9bff'
                    auralinkStatusElement.style.cursor = 'default'
                    break
                case SYNC_STATUS.SYNCED:
                    auralinkStatusElement.innerHTML = `✅ AuraLink: Synced as ${currentAuraLinkEmail}`
                    auralinkStatusElement.style.color = 'green'
                    auralinkStatusElement.style.cursor = 'pointer'
                    break
                case SYNC_STATUS.ERROR:
                    auralinkStatusElement.innerHTML = `❌ AuraLink: Sync Error! Click for details.`
                    auralinkStatusElement.style.color = '#ff5050'
                    auralinkStatusElement.style.cursor = 'pointer'
                    break
            }
        }

        if (wasPanelOpen) {
            hideAuraLinkModals()
            showStatusPanel()
        }
    }

    const hideAuraLinkModals = () => {
        auralinkLoginModal.removeClass('open')
        auralinkRegisterModal.removeClass('open')
        auralinkStatusPanel.removeClass('open')
        $('.mask').removeClass('open')
        auralinkSigninErrorElement.hide().html('')
        auralinkRegisterErrorElement.hide().html('')
    }

    const showAuraLinkError = (modalErrorElement, message) => {
        modalErrorElement.html(message).show()
    }

    const applyDashboardModeStyles = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const isDashboardMode = urlParams.get('dashboard') === '1';

        if (isDashboardMode) {
            auralinkLoginModal.find('.modal-head:first').text('Sign in to AuraLink');
            auralinkRegisterModal.find('.modal-head:first').text('Register for AuraLink');
            $('.mask').css('opacity', '1'); 
            $('.brand h1').text('AuraLink')
            return true;
        } else {
            auralinkLoginModal.find('.modal-head:first').text('Sign in to AuraLink');
            auralinkRegisterModal.find('.modal-head:first').text('AuraLink Register');
            $('.mask').css('background-color', '');
            return false;
        }
    }

    const showLoginModal = (message = null) => {
        hideAuraLinkModals()
        applyDashboardModeStyles()
        
        auralinkLoginModal.addClass('open')
        $('.mask').addClass('open')
        
        auralinkSigninEmailInput.val('')
        auralinkSigninPasswordInput.val('')
        auralinkSigninErrorElement.hide().html('')

        if (message) {
            showAuraLinkError(auralinkSigninErrorElement, message)
        }
    }

    const showRegisterModal = (message = null) => {
        hideAuraLinkModals()
        applyDashboardModeStyles()

        auralinkRegisterModal.addClass('open')
        $('.mask').addClass('open')

        auralinkRegisterEmailInput.val('')
        auralinkRegisterPasswordInput.val('')
        auralinkRegisterErrorElement.hide().html('')

        if (message) {
            showAuraLinkError(auralinkRegisterErrorElement, message)
        }
    }

    const logoutAuraLink = () => {
        auth.signOut().then(() => {
            showToast('Successfully logged out of AuraLink', 2000)
            hideAuraLinkModals()
        }).catch((error) => {
            console.error("AuraLink Logout Failed:", error)
            showToast('AuraLink Logout Failed.', 2000)
        })
    }

    const loadNotesFromAuraDrive = (uid) => {
        setSyncStatus(SYNC_STATUS.SYNCING)
        db.collection("notes").doc(uid).collection("notepad").get().then((snapshot) => {
            console.log("AuraDrive Data Received: Merging with Local Notes")

            const localNoteKeys = getNoteKeys()

            snapshot.forEach((doc) => {
                const noteData = doc.data()
                const noteId = doc.id

                if (!localNoteKeys.includes(noteId)) {
                    const localNoteData = {
                        't1': noteData.title,
                        't2': noteData.content,
                        't3': noteData.timestamp
                    }

                    localStorage.setItem(noteId, JSON.stringify(localNoteData))
                }
            })

            getNoteKeys().forEach(key => {
                saveNoteToAuraDrive(key)
            })

            updateNoteList()
            setSyncStatus(SYNC_STATUS.SYNCED)
            document.body.classList.remove('is-loading')
        }).catch((error) => {
            console.error("Error loading notes from AuraDrive:", error)
            setSyncStatus(SYNC_STATUS.ERROR)
            showToast('AuraDrive sync failed. Click status to retry.', 3000)
            document.body.classList.remove('is-loading')
        })
    }

    const saveNoteToAuraDrive = (noteId) => {
        if (!currentAuraLinkUID) return

        setSyncStatus(SYNC_STATUS.SYNCING)
        const localDataString = localStorage.getItem(noteId)
        if (!localDataString) return

        const localData = JSON.parse(localDataString)

        const noteDocRef = db.collection("notes").doc(currentAuraLinkUID).collection("notepad").doc(noteId)

        noteDocRef.set({
            title: localData.t1,
            content: localData.t2,
            timestamp: localData.t3
        }, {
            merge: true
        })
            .then(() => {
                console.log("Note saved to AuraDrive:", noteId)
                setSyncStatus(SYNC_STATUS.SYNCED)
            })
            .catch((error) => {
                console.error("Error saving note to AuraDrive:", error)
                setSyncStatus(SYNC_STATUS.ERROR)
                showToast('Note save failed. Check sync status.', 3000)
            })
    }

    // --- AUTHENTICATION HANDLERS ---

    const handleSignIn = (email, password) => {
        setSyncStatus(SYNC_STATUS.SYNCING)
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                // Success handled by onAuthStateChanged observer
                hideAuraLinkModals()
            })
            .catch((error) => {
                setSyncStatus(SYNC_STATUS.SIGNED_OUT)
                showAuraLinkError(auralinkSigninErrorElement, `Sign In Failed: ${error.message}`)
                console.error("Sign In Failed:", error)
            })
    }

    const handleRegister = (email, password) => {
        setSyncStatus(SYNC_STATUS.SYNCING)
        auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                // Success handled by onAuthStateChanged observer
                hideAuraLinkModals()
                showToast('Account created and signed in!', 3000)
            })
            .catch((error) => {
                setSyncStatus(SYNC_STATUS.SIGNED_OUT)
                showAuraLinkError(auralinkRegisterErrorElement, `Registration Failed: ${error.message}`)
                console.error("Registration Failed:", error)
            })
    }

    // --- EVENT LISTENERS ---

    // 1. Modal Navigation Links
    auralinkShowRegisterBtn.click((e) => {
        e.preventDefault()
        showRegisterModal()
    })

    auralinkShowSigninBtn.click((e) => {
        e.preventDefault()
        showLoginModal()
    })

    // 2. Form Submissions (CRITICAL FIXES HERE)
    auralinkSigninForm.submit((e) => {
        // PREVENT DEFAULT SUBMISSION (stops page refresh/URL exposure)
        e.preventDefault() 
        const email = auralinkSigninEmailInput.val()
        const password = auralinkSigninPasswordInput.val()

        if (!email || !password) {
            showAuraLinkError(auralinkSigninErrorElement, "Please enter both email and password.")
            return
        }

        handleSignIn(email, password)
    })

    auralinkRegisterForm.submit((e) => {
        // PREVENT DEFAULT SUBMISSION (stops page refresh/URL exposure)
        e.preventDefault() 
        const email = auralinkRegisterEmailInput.val()
        const password = auralinkRegisterPasswordInput.val()

        if (!email || !password) {
            showAuraLinkError(auralinkRegisterErrorElement, "Please enter both email and password to register.")
            return
        }
        
        handleRegister(email, password)
    })


    $('#auralink_login_modal .modal-x').click(hideAuraLinkModals)
    $('#auralink_register_modal .modal-x').click(hideAuraLinkModals)
    $('#auralink_status_panel .modal-x').click(hideAuraLinkModals)
    panelLogoutBtn.click(logoutAuraLink)


    // --- ON AUTH STATE CHANGED (Redirect Logic) ---
    auth.onAuthStateChanged((user) => {
        if (user) {
            currentAuraLinkUID = user.uid
            currentAuraLinkEmail = user.email
            setSyncStatus(SYNC_STATUS.SYNCING)

            loadNotesFromAuraDrive(currentAuraLinkUID)

            // Handle the redirect after successful sign-in (for dashboard mode)
            const urlParams = new URLSearchParams(window.location.search);
            const isDashboardMode = urlParams.get('dashboard') === '1';
            const returnUrl = urlParams.get('return');

            if (isDashboardMode) {
                if (returnUrl) {
                    window.location.replace(decodeURIComponent(returnUrl));
                } else {
                    window.location.replace('/auralink/dashboard.html');
                }
            }
        } else {
            currentAuraLinkUID = null
            currentAuraLinkEmail = null
            setSyncStatus(SYNC_STATUS.SIGNED_OUT)
            showLoginModal() 
        }
    })

    const originalSaveNote = saveNote
    saveNote = () => {
        originalSaveNote()

        if (currentAuraLinkUID) {
            if (saveTimer) {
                clearTimeout(saveTimer)
            }

            setSyncStatus(SYNC_STATUS.SYNCING)

            saveTimer = setTimeout(() => {
                saveNoteToAuraDrive(currentNoteID)
            }, SAVE_DELAY_MS)
        }
    }

    const originalDeleteNote = deleteNote
    deleteNote = () => {
        if (currentAuraLinkUID && currentNoteID) {
            if (saveTimer) {
                clearTimeout(saveTimer)
                saveTimer = null
            }

            setSyncStatus(SYNC_STATUS.SYNCING)
            db.collection("notes").doc(currentAuraLinkUID).collection("notepad").doc(currentNoteID).delete()
                .then(() => {
                    console.log("Note deleted from AuraDrive:", currentNoteID)
                    setSyncStatus(SYNC_STATUS.SYNCED)
                }).catch((error) => {
                    console.error("Error deleting note from AuraDrive:", error)
                    setSyncStatus(SYNC_STATUS.ERROR)
                    showToast('Note deletion failed. Check sync status.', 3000)
                })
        }
        originalDeleteNote()
    }

    const originalStartNewNote = startNewNote
    startNewNote = () => {
        originalStartNewNote()
    }

    $('.mask-higher').css('display', 'none')
    $('.mask-higher').css('opacity', '0')
    setTimeout("$('.mask-higher')[0].remove()", 0)
    
}); // End of $(document).ready()