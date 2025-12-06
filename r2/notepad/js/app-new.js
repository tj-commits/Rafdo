(function() {
    var TimeAgo
    TimeAgo = function() {
        function TimeAgoConstructor(element, options) {
            this.startInterval = 60000
            this.init(element, options)
        }
        TimeAgoConstructor.prototype.init = function(element, options) {
            this.$element = $(element)
            this.options = $.extend({}, $.fn.timeago.defaults, options)
            this.updateTime()
            this.startTimer()
        }
        TimeAgoConstructor.prototype.startTimer = function() {
            var self
            self = this
            this.interval = setInterval(function() {
                self.refresh()
            }, this.startInterval)
        }
        TimeAgoConstructor.prototype.stopTimer = function() {
            clearInterval(this.interval)
        }
        TimeAgoConstructor.prototype.restartTimer = function() {
            this.stopTimer()
            this.startTimer()
        }
        TimeAgoConstructor.prototype.refresh = function() {
            this.updateTime()
            this.updateInterval()
        }
        TimeAgoConstructor.prototype.updateTime = function() {
            var self
            self = this
            this.$element.findAndSelf(this.options.selector).each(function() {
                var timeInWords
                timeInWords = self.timeAgoInWords($(this).attr(self.options.attr))
                $(this).html(timeInWords)
            })
        }
        TimeAgoConstructor.prototype.updateInterval = function() {
            var f, o, p, q
            if (this.$element.findAndSelf(this.options.selector).length > 0) {
                if ('up' === this.options.dir ? f = ':first' : 'down' === this.options.dir && (f = ':last'), q = this.$element.findAndSelf(this.options.selector).filter(f).attr(this.options.attr), o = this.parse(q), (p = this.getTimeDistanceInMinutes(o)) >= 0 && p <= 44 && 60000 !== this.startInterval) {
                    this.startInterval = 60000
                    this.restartTimer()
                } else if (p >= 45 && p <= 89 && 132000 !== this.startInterval) {
                    this.startInterval = 132000
                    this.restartTimer()
                } else if (p >= 90 && p <= 2519 && 1120000 !== this.startInterval) {
                    this.startInterval = 1120000
                    this.restartTimer()
                } else if (p >= 2520 && 43200000 !== this.startInterval) {
                    this.startInterval = 43200000
                    this.restartTimer()
                }
            }
        }
        TimeAgoConstructor.prototype.timeAgoInWords = function(timestamp) {
            var parsedTime
            parsedTime = this.parse(timestamp)
            return '' + this.options.lang.prefixes.ago + this.distanceOfTimeInWords(parsedTime)
        }
        TimeAgoConstructor.prototype.parse = function(timestampString) {
            var timeString
            timeString = (timeString = (timeString = (timeString = (timeString = $.trim(timestampString)).replace(/\.\d\d\d+/, '')).replace(/-/, '/').replace(/-/, '/')).replace(/T/, ' ').replace(/Z/, ' UTC')).replace(/([\+\-]\d\d)\:?(\d\d)/, ' $1$2')
            return new Date(timeString)
        }
        TimeAgoConstructor.prototype.getTimeDistanceInMinutes = function(time) {
            var differenceInMs
            differenceInMs = new Date().getTime() - time.getTime()
            return Math.round(Math.abs(differenceInMs) / 1000 / 60)
        }
        TimeAgoConstructor.prototype.distanceOfTimeInWords = function(time) {
            var minutesDifference
            minutesDifference = this.getTimeDistanceInMinutes(time)
            return 0 === minutesDifference ? '' + this.options.lang.prefixes.lt : 1 === minutesDifference ? '1 ' + this.options.lang.units.minute + this.options.lang.suffix : minutesDifference >= 2 && minutesDifference <= 44 ? minutesDifference + ' ' + this.options.lang.units.minutes + this.options.lang.suffix : minutesDifference >= 45 && minutesDifference <= 89 ? ' 1 ' + this.options.lang.units.hour + this.options.lang.suffix : minutesDifference >= 90 && minutesDifference <= 1439 ? ' ' + Math.round(minutesDifference / 60) + ' ' + this.options.lang.units.hours + this.options.lang.suffix : minutesDifference >= 1440 && minutesDifference <= 2519 ? '1 ' + this.options.lang.units.day : minutesDifference >= 2520 && minutesDifference <= 43199 ? Math.round(minutesDifference / 1440) + ' ' + this.options.lang.units.days + this.options.lang.suffix : minutesDifference >= 43200 && minutesDifference <= 86399 ? ' 1 ' + this.options.lang.units.month + this.options.lang.suffix : minutesDifference >= 86400 && minutesDifference <= 472499 ? Math.round(minutesDifference / 43200) + ' ' + this.options.lang.units.months + this.options.lang.suffix : minutesDifference >= 472500 && minutesDifference <= 599039 ? ' 1 ' + this.options.lang.units.year + this.options.lang.suffix : minutesDifference >= 599040 && minutesDifference <= 712799 ? this.options.lang.prefixes.over + ' 1 ' + this.options.lang.units.year + this.options.lang.suffix : minutesDifference >= 712800 && minutesDifference <= 788399 ? this.options.lang.prefixes.almost + ' 2 ' + this.options.lang.units.years + this.options.lang.suffix : ' ' + Math.round(minutesDifference / 472500) + ' ' + this.options.lang.units.years + this.options.lang.suffix
        }
        return TimeAgoConstructor
    }(), $['fn']['timeago'] = function(options) {
        null == options && (options = {})
        return this.each(function() {
            var $element, instance
            return (instance = ($element = $(this)).data('timeago')) ? 'string' == typeof options ? instance[options]() : void 0x0 : $element.data('timeago', new TimeAgo(this, options))
        })
    }, $['fn']['findAndSelf'] = function(selector) {
        return this.find(selector).add(this.filter(selector))
    }, $['fn']['timeago']['Constructor'] = TimeAgo
    $['fn']['timeago']['defaults'] = {
        'selector': 'time',
        'attr': 'stamp',
        'dir': 'up',
        'lang': {
            'units': {
                'second': 'second',
                'seconds': 'seconds',
                'minute': 'minute',
                'minutes': 'minutes',
                'hour': 'hour',
                'hours': 'hours',
                'day': 'day',
                'days': 'days',
                'month': 'month',
                'months': 'months',
                'year': 'year',
                'years': 'years'
            },
            'prefixes': {
                'lt': 'just now',
                'over': 'over',
                'almost': 'almost',
                'ago': ''
            },
            'suffix': ' ago'
        }
    }
}['call'](this))

$('.toast').on('click', function() {
    console.log('clICKED')
    document.querySelector('.toast').style.display = 'none'
})

var savedSelectionText, savedSelectionStart, savedSelectionEnd, currentFontFamily, currentFontSize, currentFontWeight, currentFontStyle, currentFontLine
var noteTitleInput = $('#n_title')
var noteTextInput = $('#n_text')
var currentNoteID = localStorage.getItem('current')
var preferredSort = localStorage.getItem('pref_sort')

updateNoteList()
handleMobileView()

if (currentNoteID in localStorage) {
    loadCurrentNote()
    highlightCurrentNote()
    updateWordCount()
}

if ('pref_font' in localStorage) {
    var fontPreferences = JSON.parse(localStorage.getItem('pref_font'))
    currentFontFamily = fontPreferences.ff
    $('#font_family').val(currentFontFamily)
    currentFontSize = fontPreferences.fz
    $('#font_size').val(currentFontSize)
    currentFontWeight = fontPreferences.fw
    $('#font_weight').val(currentFontWeight)
    currentFontStyle = fontPreferences.fs
    $('#font_style').val(currentFontStyle)
    currentFontLine = fontPreferences.fl
    $('#font_line').val(currentFontLine)
    applyFontStyles(noteTextInput)
}

function startNewNote() {
    currentNoteID = generateNewNoteID()
    noteTitleInput.val('')
    noteTextInput.val('')
    saveNote() 
    updateNoteList()
    setCurrentNoteID()
}

function saveNote() {
    var noteData = {
        't1': noteTitleInput.val().trim(),
        't2': noteTextInput.val(),
        't3': getCurrentTimestamp()
    }
    currentNoteID || (currentNoteID = generateNewNoteID())
    localStorage.setItem(currentNoteID, JSON.stringify(noteData))
    updateNoteList()
    setCurrentNoteID()
}

function deleteNote() {
    localStorage.removeItem(currentNoteID)
    localStorage.removeItem('current')
    $('#' + currentNoteID).remove()
    noteTitleInput.val('')
    noteTextInput.val('')
    checkEmptyNotes()
}

function updateNoteList() {
    $('.notes').empty()
    for (var i = 0; i < localStorage.length; i++)
        if ('note-' == localStorage.key(i).substring(0, 5)) {
            var storedNote = JSON.parse(localStorage.getItem(localStorage.key(i)))
            if ('' == storedNote.t1) var noteTitleDisplay = '<b>Untitled Note</b>'
            else noteTitleDisplay = '<b>' + escapeHtml(storedNote.t1) + '</b>'
            if ('' == storedNote.t2) var noteContentDisplay = '<p>Blank</p>'
            else noteContentDisplay = '<p>' + escapeHtml(storedNote.t2) + '</p>'
            var noteHtml = noteTitleDisplay + noteContentDisplay + ('<time stamp="' + storedNote.t3 + '"></time>')
            $('.notes').append('<li id="' + localStorage.key(i) + '">' + noteHtml + '<li>')
        } 
    $('time').timeago()
    $('.notes>li:empty').remove()
    highlightCurrentNote()
    'pref_sort' in localStorage && applySorting(preferredSort = localStorage.getItem('pref_sort'))
    checkEmptyNotes()
}

function clearAllNotes() {
    for (var noteKeys = [], i = 0; i < localStorage.length; i++) 'note-' == localStorage.key(i).substring(0, 5) && noteKeys.push(localStorage.key(i))
    for (i = 0; i < noteKeys.length; i++) localStorage.removeItem(noteKeys[i])
    updateNoteList()
}

function generateNewNoteID() {
    return 'note-' + Date.now()
}

function getCurrentTimestamp() {
    return new Date().toISOString()
}

function escapeHtml(content) {
    var tempArea = document.createElement('textarea')
    return tempArea.textContent = content
    tempArea.innerHTML
}

function setCurrentNoteID() {
    localStorage.setItem('current', currentNoteID)
    highlightCurrentNote()
}

function loadCurrentNote() {
    var currentNoteData = JSON.parse(localStorage.getItem(currentNoteID))
    noteTitleInput.val(currentNoteData.t1)
    noteTextInput.val(currentNoteData.t2)
}

function highlightCurrentNote() {
    $('#' + currentNoteID).addClass('active').siblings().removeClass('active')
}

function updateWordCount() {
    var words = noteTextInput.val().replace(/\s\s+|\n/gm, ' ').match(/\w+/gm)
    var numWords = null == words ? 0 : words.length
    $('#wordsNum').html('Words: ' + numWords)
}

function updateCaretPosition() {
    var selectionEnd = noteTextInput.prop('selectionEnd')
    var content = noteTextInput.val()
    var contentSubstring = content.substring(0, selectionEnd)
    var lineCount = contentSubstring.split('\n').length
    var column = contentSubstring.split('\n')[lineCount - 1].length + 1
    $('#caretPos').html('Line ' + lineCount + ', Column ' + column)
}

function saveCurrentSelection() {
    var selectionStart = noteTextInput.prop('selectionStart')
    var selectionEnd = noteTextInput.prop('selectionEnd')
    var selectionText = noteTextInput.val().substring(selectionStart, selectionEnd)
    savedSelectionStart = selectionStart
    savedSelectionEnd = selectionEnd
    savedSelectionText = selectionText
}

function toggleFullscreen() {
    $('.container').toggleClass('fullscreen')
    $('#winSize').toggleClass('i-shrink').toggleClass('i-fullscreen')
    $('#winCheck').toggleClass('i-check')
}

$('#new_btn, #file_new').click(function() {
    startNewNote()
})

$('#n_text, #n_title').on('change keyup paste', function() {
    saveNote()
})

noteTextInput.on('change keyup paste', function() {
    updateWordCount()
    historyRemember()
})

$('#del_btn').click(function() {
    $('#confirm, .mask').toggleClass('open')
    $('#confirm .modal-body>p').html('Are you sure you want to delete this note?')
    $('#confirm-1').html('Yes').attr('id', 'del_yes')
    $('#confirm-2').html('No')
})

$('#confirm').on('click', '#del_yes', function() {
    deleteNote()
    showToast('Deleted')
})

noteTextInput.on('click keyup', function() {
    updateCaretPosition()
})

noteTextInput.on('blur', function() {
    $('#caretPos').empty()
})

$('.stay-focus, #char_list, #emoji_list, .mask').click(function() {
    noteTextInput.selectRange(savedSelectionStart, savedSelectionEnd)
})

$('.container').on('mouseup', function() {
    saveCurrentSelection()
})

$(document).ready(function() {
    $('.notes').on('click', 'li', function() {
        currentNoteID = $(this).attr('id')
        var currentNoteData = JSON.parse(localStorage.getItem(currentNoteID))
        noteTitleInput.val(currentNoteData.t1)
        noteTextInput.val(currentNoteData.t2)
        setCurrentNoteID()
        updateWordCount()
        historyForget()
    })
})

$.fn.selectRange = function(start, end) {
    return this.each(function() {
        if (this.setSelectionRange) {
            this.focus()
            this.setSelectionRange(start, end)
        } else if (this.createTextRange) {
            var range = this.createTextRange()
            range.collapse(true)
            range.moveEnd('character', end)
            range.moveStart('character', start)
            range.select()
        }
    })
}

$('.fullscreen_btn').click(function() {
    toggleFullscreen()
})

$('#isWrap').click(function() {
    $('#isWrap>i').toggleClass('i-check')
    $('#isWrap>i').hasClass('i-check') ? (noteTextInput.removeClass('wrap-off'), localStorage.setItem('pref_wrap', 1)) : (noteTextInput.addClass('wrap-off'), localStorage.setItem('pref_wrap', 0))
})
var preferredWrap = localStorage.getItem('pref_wrap')
0 == preferredWrap && (noteTextInput.addClass('wrap-off'), $('#isWrap>i').removeClass('i-check'))

$('#isSpell').click(function() {
    if ($('#isSpell>i').toggleClass('i-check'), $('#isSpell>i').hasClass('i-check')) noteTextInput.prop('spellcheck', true), localStorage.setItem('pref_spell', 1)
    else {
        noteTextInput.prop('spellcheck', false)
        localStorage.setItem('pref_spell', 0)
        var currentContent = noteTextInput.val()
        noteTextInput.val('').val(currentContent)
    }
})
var preferredSpellcheck = localStorage.getItem('pref_spell')
0 == preferredSpellcheck && (noteTextInput.prop('spellcheck', false), $('#isSpell>i').removeClass('i-check'))

$('#isStatus').click(function() {
    $('#isStatus>i').toggleClass('i-check')
    $('#isStatus>i').hasClass('i-check') ? ($('.editor').removeClass('no-statusbar'), localStorage.setItem('pref_sbar', 1)) : ($('.editor').addClass('no-statusbar'), localStorage.setItem('pref_sbar', 0))
})
var preferredStatusBar = localStorage.getItem('pref_sbar')

function applySorting(sortType) {
    if ('AZ' == sortType) $('.notes>li').sort(function(a, b) {
        return $(b).find('b').text().toLowerCase() < $(a).find('b').text().toLowerCase() ? 1 : -1
    }).each(function() {
        $('.notes').append(this)
    })
    else if ('Date' == sortType) $('.notes>li').sort(function(a, b) {
        return new Date($(a).find('time').attr('stamp')) > new Date($(b).find('time').attr('stamp')) ? 1 : -1
    }).each(function() {
        $('.notes').prepend(this)
    })
    else if ('None' == sortType) return
}
0 == preferredStatusBar && ($('.editor').addClass('no-statusbar'), $('#isStatus>i').removeClass('i-check'))

$('#sortAZ').click(function() {
    $('#sortAZ>i').addClass('i-check')
    $('#sortNone>i, #sortDate>i').removeClass('i-check')
    localStorage.setItem('pref_sort', 'AZ')
    applySorting('AZ')
    preferredSort = localStorage.getItem('pref_sort')
})

$('#sortDate').click(function() {
    $('#sortDate>i').addClass('i-check')
    $('#sortAZ>i, #sortNone>i').removeClass('i-check')
    localStorage.setItem('pref_sort', 'Date')
    applySorting('Date')
    preferredSort = localStorage.getItem('pref_sort')
})

$('#sortNone').click(function() {
    $('#sortNone>i').addClass('i-check')
    $('#sortAZ>i, #sortDate>i').removeClass('i-check')
    localStorage.setItem('pref_sort', 'None')
    updateNoteList()
    preferredSort = localStorage.getItem('pref_sort')
})

'AZ' == preferredSort ? ($('#sortAZ>i').addClass('i-check'), $('#sortNone>i, #sortDate>i').removeClass('i-check')) : 'Date' == preferredSort ? ($('#sortDate>i').addClass('i-check'), $('#sortAZ>i, #sortNone>i').removeClass('i-check')) : 'None' == preferredSort && ($('#sortNone>i').addClass('i-check'), $('#sortAZ>i, #sortDate>i').removeClass('i-check'))

$('#view_compact').click(function() {
    $('.saved-notes').addClass('compact-view')
    $('#view_compact>i').addClass('i-check')
    $('#view_all>i').removeClass('i-check')
    localStorage.setItem('pref_view', 'compact')
})

$('#view_all').click(function() {
    $('.saved-notes').removeClass('compact-view')
    $('#view_all>i').addClass('i-check')
    $('#view_compact>i').removeClass('i-check')
    localStorage.removeItem('pref_view')
})
var preferredView = localStorage.getItem('pref_view')

function checkEmptyNotes() {
    $('.notes').is(':empty') && $('.notes').html('<span>No saved notes.</span>')
}

function openFile() {
    var file = $('#file_open').get(0).files[0]
    var reader = new FileReader()
    var filename = file.name
    reader.onload = function(event) {
        var content = event.target.result
        console.log('here')
        console.log(filename)
        var noteName = filename.split('.')[0]
        noteTextInput.val(content)
        noteTitleInput.val(noteName)
        saveNote()
        historyRemember() 
    }
    reader.readAsText(file, 'UTF-8')
}

function saveFile(filename, content, mimeType) {
    var defaultFilename = filename
    var blob = new Blob([content], {
        'type': mimeType
    })
    if ('undefined' != typeof navigator && navigator.msSaveOrOpenBlob) navigator.msSaveOrOpenBlob(blob, defaultFilename)
    else {
        var link = document.createElement('a')
        link.download = defaultFilename
        link.href = window.URL.createObjectURL(blob)
        link.target = '_blank'
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }
}

function printNote() {
    var originalTitle = document.title
    '' == noteTitleInput.val() ? document.title = '\u00a0' : document.title = noteTitleInput.val()
    var contentHtml = escapeHtml(noteTextInput.val()).replace(/\n/gm, '<br>')
    $('#print').html(contentHtml)
    applyFontStyles($('#print'))
    window.print()
    document.title = originalTitle
}

'compact' == preferredView && ($('.saved-notes').addClass('compact-view'), $('#view_all>i').removeClass('i-check'), $('#view_compact>i').addClass('i-check'))

$('#file_open').on('change', function() {
    historyRemember()
    openFile()
})

$('#file_save').click(function() {
    saveNote()
    showToast('Saved')
})

$('#file_download').click(function() {
    $('#confirm, .mask').toggleClass('open')
    $('#confirm .modal-head>b').html('Save As')
    '' == noteTitleInput.val() ? filename = 'Untitled Note.txt' : filename = noteTitleInput.val() + '.txt'
    $('#confirm .modal-body>p').html('<div class="form-group"><label class="w-30">Filename</label><input id="filename_box" class="input w-70" value="' + filename + '" spellcheck="false"></div>')
    $('.confirm-1').html('Save').attr('id', 'download_yes')
    $('.confirm-2').html('Cancel')
})

$('#confirm').on('click', '#download_yes', function() {
    saveFile($('#filename_box').val(), noteTextInput.val().replace(/\n/g, '\r\n'), 'text/plain')
})

$('#file_print').click(function() {
    printNote()
})

var historyStack, historyIndex = 0
var historyManager = function() {
    var historyStack = []
    var historyIndex = 0
    return {
        'remember': function(content) {
            historyStack[historyIndex - 1] !== content && (historyStack.splice(historyIndex, 10), historyStack.push(content), historyStack.splice(0, historyStack.length - 10), historyIndex = historyStack.length)
        },
        'undo': function() {
            if (historyIndex > 1) return historyStack[--historyIndex - 1]
        },
        'redo': function() {
            if (historyIndex < historyStack.length) return historyStack[historyIndex++]
        },
        'forget': function() {
            historyStack = []
        }
    }
}()

var debounceTimer = function() {
    var timer = 0
    return function(callback, delay) {
        clearTimeout(timer)
        timer = setTimeout(callback, delay)
    }
}()

function historyRemember() {
    var content = noteTextInput.val()
    historyManager.remember(content)
}

function historyForget() {
    historyManager.forget()
}

function historyUndo() {
    var content = historyManager.undo()
    void 0x0 !== content && noteTextInput.val(content)
    saveNote()
}

function historyRedo() {
    var content = historyManager.redo()
    void 0x0 !== content && noteTextInput.val(content)
    saveNote()
}

function copyToClipboard(text) {
    var tempArea = document.createElement('textarea')
    document.body.appendChild(tempArea)
    tempArea.value = text
    tempArea.select()
    document.execCommand('copy')
    document.body.removeChild(tempArea)
}

function deleteSelection() {
    '' != savedSelectionText && (document.execCommand('delete'), savedSelectionEnd = savedSelectionStart)
    savedSelectionText = ''
}

function insertText(text) {
    deleteSelection()
    var textLength = text.length
    savedSelectionStart = savedSelectionEnd += textLength
    var textarea = noteTextInput.get(0)
    var cursorPosition = textarea.selectionStart
    textarea.value = textarea.value.slice(0, cursorPosition) + text + textarea.value.slice(cursorPosition)
    textarea.setSelectionRange(cursorPosition + 1, cursorPosition + 1)
    historyRemember()
    saveNote()
}

function getCurrentDateTime() {
    var date = new Date()
    var hours = date.getHours()
    var minutes = date.getMinutes()
    var ampm = hours >= 12 ? 'pm' : 'am'
    var formattedHours = (hours %= 12) || 12
    var formattedMinutes = minutes < 10 ? '0' + minutes : minutes
    var time = formattedHours + ':' + formattedMinutes + ' ' + ampm
    return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + ' ' + time
}

function applyFontStyles(element) {
    element.css({
        'font-family': currentFontFamily,
        'font-size': currentFontSize,
        'font-weight': currentFontWeight,
        'font-style': currentFontStyle,
        'line-height': currentFontLine
    })
}

function downloadBackup() {
    $.getScript('https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.5/jszip.min.js', function() {
        for (var zip = new JSZip(), i = 0; i < localStorage.length; i++)
            if ('note-' == localStorage.key(i).substring(0, 5)) {
                var storedNote = JSON.parse(localStorage.getItem(localStorage.key(i)))
                if ('' == storedNote.t1) var filename = 'Untitled Note ' + i
                else filename = storedNote.t1
                zip.file(filename + '.txt', storedNote.t2.replace(/\n/g, '\r\n'))
            } zip.generateAsync({
            'type': 'blob'
        }).then(function(content) {
            saveFile('backup.zip', content, 'application/zip')
        }), showToast('Backup downloaded')
    })
}

function showToast(message, msDelay) {
    if (!msDelay) msDelay = 2000
    $('.toast-content').html(message)
    $('.toast').show().delay(msDelay).fadeOut(250)
}

function handleMobileView() {
    $(window).width() <= 992 ? ($('.container').hasClass('pulled') ? $('.mob-mask').removeClass('open') : ($('.mob-mask').addClass('open'), $('.mob-mask').click(function() {
        $('.container').addClass('pulled')
        $('.mob-mask').removeClass('open')
    })), $(document).ready(function() {
        $('.notes').on('click', 'li', function() {
            $('.container').addClass('pulled')
            $('.mob-mask').removeClass('open')
        })
    }), $(document).ready(function() {
        $('#confirm').on('click', '#del_yes', function() {
            $('.container').removeClass('pulled')
            $('.mob-mask').addClass('open')
        })
    })) : ($('.mob-mask').removeClass('open'), $(document).ready(function() {
        $('.notes').on('click', 'li', function() {
            $('.container').removeClass('pulled')
        })
    }))
}

noteTextInput.on('keyup', function() {
    debounceTimer(function() {
        historyRemember()
    }, 1000)
})

$('#edit_undo').click(function() {
    historyUndo()
})

$('#edit_redo').click(function() {
    historyRedo()
})

$('#edit_cut').click(function() {
    document.execCommand('copy')
    document.execCommand('delete')
    saveNote()
})

$('#edit_copy').click(function() {
    copyToClipboard(savedSelectionText)
    showToast('Copied')
})

$('#edit_del').click(function() {
    deleteSelection()
    saveNote()
})

$('#edit_sel').click(function() {
    savedSelectionStart = 0
    savedSelectionEnd = noteTextInput.val().length
})

$('#edit_fnr').click(function() {
    $('#find_replace, .mask').toggleClass('open')
})

$('#replaceall_btn').click(function() {
    historyRemember()
    var content = noteTextInput.val()
    var findText = $('#find_box').val().replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1')
    var replaceText = $('#replace_box').val()
    if ($('#match_case').prop('checked')) var flags = 'g'
    else flags = 'gi'
    if ($('#whole_words').prop('checked')) var regex = new RegExp('\\b' + findText + '\\b', flags)
    else regex = new RegExp(findText, flags)
    var counter = 0
    var matches = content.match(regex)
    counter = null != matches ? matches.length : 0
    content = content.replace(regex, replaceText)
    noteTextInput.val(content)
    0 == counter ? showToast('No matches found') : showToast('Made ' + counter + ' replacements')
    historyRemember()
    saveNote()
})

$('#ins_time').click(function() {
    insertText(getCurrentDateTime())
})

var selectedChar
$('.charlist li').click(function() {
    $(this).addClass('chosen').siblings().removeClass('chosen')
    selectedChar = $(this).html()
})

$('.ins_char_btn').click(function() {
    insertText(selectedChar)
})

$('#font_btn').click(function() {
    $('#font_format, .mask').toggleClass('open')
})

$('#font_family, #font_size, #font_weight, #font_style, #font_line').on('change', function() {
    currentFontFamily = $('#font_family').val()
    currentFontSize = $('#font_size').val()
    currentFontWeight = $('#font_weight').val()
    currentFontStyle = $('#font_style').val()
    currentFontLine = $('#font_line').val()
    applyFontStyles(noteTextInput)
    var fontPreferences = {
        'ff': currentFontFamily,
        'fz': currentFontSize,
        'fw': currentFontWeight,
        'fs': currentFontStyle,
        'fl': currentFontLine
    }
    localStorage.setItem('pref_font', JSON.stringify(fontPreferences))
})

$('#reset_font').click(function() {
    noteTextInput.removeAttr('style')
    localStorage.removeItem('pref_font')
    $('#font_family').val('inherit')
    $('#font_size').val('11pt')
    $('#font_weight').val('400')
    $('#font_style').val('Normal')
    $('#font_line').val('1.8')
})

$('#about_btn').click(function() {
    $('#about_app, .mask').toggleClass('open')
})

$('#backup_btn').click(function() {
    downloadBackup()
})

$('#clear_btn').click(function() {
    $('#confirm, .mask').toggleClass('open')
    $('#confirm .modal-body>p').html('Are you sure you want to permanently delete all your saved notes?')
    $('.confirm-1').html('Yes').attr('id', 'clear_yes')
    $('.confirm-2').html('No')
})

$('#confirm').on('click', '#clear_yes', function() {
    clearAllNotes()
})

$(window).bind('keydown', function(event) {
    if (event.ctrlKey || event.metaKey) switch (String.fromCharCode(event.which).toLowerCase()) {
        case 'o':
            event.preventDefault()
            $('#file_open').trigger('click')
            break
        case 's':
            event.preventDefault()
            saveNote()
            showToast('Saved')
            break
        case 'p':
            event.preventDefault()
            printNote()
            break
        case 'z':
            event.preventDefault()
            historyUndo()
            break
        case 'y':
            event.preventDefault()
            historyRedo()
    }
    if ((event.ctrlKey || event.metaKey) && event.shiftKey) switch (String.fromCharCode(event.which).toLowerCase()) {
        case 's':
            event.preventDefault()
            $('#file_download').trigger('click')
            break
        case 'd':
            event.preventDefault()
            $('#ins_time').trigger('click')
            break
        case 'c':
            event.preventDefault()
            $('#ins_char').trigger('click')
            break
        case 'e':
            event.preventDefault()
            $('#ins_emo').trigger('click')
            break
        case 'r':
            event.preventDefault()
            $('#edit_fnr').trigger('click')
            break
        case 'g':
            event.preventDefault()
            $('#font_btn').trigger('click')
            break
        case 'f':
            event.preventDefault()
            toggleFullscreen()
    }
})

$('a[href="#"]').click(function(event) {
    event.preventDefault ? event.preventDefault() : event.returnValue = false
})

$('#hide-sky').click(function() {
    $('.container').toggleClass('no-ad')
})

$('.modal-x, .confirm-1, .confirm-2').click(function() {
    $('.modal, .mask').removeClass('open')
})

$('body').ready(function() {
    $(document).on('click', '.menu>li>a', function(event) {
        $(this).addClass('active')
        $(this).siblings().show()
        $(this).parent().siblings().each(function(index, element) {
            $(element).find('.menu>li>ul').hide()
        })
    })
})

$('body').mouseup(function(event) {
    var dropdown = $('.menu>li>ul')
    dropdown.is(event.target) || (dropdown.hide(), $('.menu>li>a').removeClass('active'))
})

$('.saved-notes').ready(function() {
    $('#n_search').keyup(function() {
        var searchTerm = $(this).val()
        var regex = new RegExp(searchTerm, 'gi')
        $('.notes>li').fadeOut(100).each(function() {
            $(this).html().match(regex) && $(this).stop().show()
        })
    })
})

$('#nav-btn').click(function() {
    $('.container').toggleClass('pulled')
    handleMobileView()
})

$(window).on('resize', function() {
    handleMobileView()
})

historyRemember()