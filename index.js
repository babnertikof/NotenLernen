/**
 * @typedef {object} Note
 * @property {string} letter
 * @property {string} imageURL
 */
export const note_store = {
    "a4": /** @type {Note} */ {
        letter: "a",
        imageURL: "./Notes/note_a4.png"
    },
    "ais4": /** @type {Note} */ {
        letter: "ais",
        imageURL: "./Notes/note_ais4.png"
    },
    "as4": /** @type {Note} */ {
        letter: "as",
        imageURL: "./Notes/note_as4.png"
    },
    "b4": /** @type {Note} */ {
        letter: "b",
        imageURL: "./Notes/note_b4.png"
    },
    "c4": /** @type {Note} */ {
        letter: "c",
        imageURL: "./Notes/note_c4.png"
    },
    "c5": /** @type {Note} */ {
        letter: "c",
        imageURL: "./Notes/note_c5.png"
    },
    "cis4": /** @type {Note} */ {
        letter: "cis",
        imageURL: "./Notes/note_cis4.png"
    },
    "d4": /** @type {Note} */ {
        letter: "d",
        imageURL: "./Notes/note_d4.png"
    },
    "des4": /** @type {Note} */ {
        letter: "des",
        imageURL: "./Notes/note_des4.png"
    },
    "dis4": /** @type {Note} */ {
        letter: "dis",
        imageURL: "./Notes/note_dis4.png"
    },
    "e4": /** @type {Note} */ {
        letter: "e",
        imageURL: "./Notes/note_e4.png"
    },
    "es4": /** @type {Note} */ {
        letter: "es",
        imageURL: "./Notes/note_es4.png"
    },
    "f4": /** @type {Note} */ {
        letter: "f",
        imageURL: "./Notes/note_f4.png"
    },
    "fes4": /** @type {Note} */ {
        letter: "fes",
        imageURL: "./Notes/note_fes4.png"
    },
    "fis4": /** @type {Note} */ {
        letter: "fis",
        imageURL: "./Notes/note_fis4.png"
    },
    "g4": /** @type {Note} */ {
        letter: "g",
        imageURL: "./Notes/note_g4.png"
    },
    "ges4": /** @type {Note} */ {
        letter: "ges",
        imageURL: "./Notes/note_ges4.png"
    },
    "gis4": /** @type {Note} */ {
        letter: "gis",
        imageURL: "./Notes/note_gis4.png"
    },
    "h4": /** @type {Note} */ {
        letter: "h",
        imageURL: "./Notes/note_h4.png"
    }
};

let selectionCash=[]
export function selectNote(){
    const keys = Object.keys(note_store).filter(key=> !selectionCash.includes(key))
    const randomKey = keys[Math.floor(Math.random()*keys.length)]
    selectionCash.push(randomKey)
    if(selectionCash.length>5){
        selectionCash.shift()
    }
    return randomKey
}

export function correctNote(key,letter){
    const note = note_store[key]
    return note.letter === letter.trim().toLowerCase()
}

const logs = []

export function saveLogs(key,userLetter,correctness){
    logs.push(`${note_store[key].letter} - ${userLetter} - ${correctness ? "correct" : "incorrect"}`)
    return logs
}

const image = document.querySelector(".image-container img")
const imageContainer = document.querySelector(".image-container")
const form = document.querySelector(".input-container")
const input = form.querySelector("input")
const logList = document.querySelector(".logs")
let currentNote = selectNote()

function showNote(){
    image.src = note_store[currentNote].imageURL
}

form.addEventListener("submit", event => {
    event.preventDefault()
    const isCorrect = correctNote(currentNote, input.value)
    imageContainer.classList.remove("correct", "incorrect")
    requestAnimationFrame(() => imageContainer.classList.add(isCorrect ? "correct" : "incorrect"))
    saveLogs(currentNote, input.value.trim(), isCorrect)
    const entry = document.createElement("li")
    entry.textContent = logs[logs.length - 1]
    logList.prepend(entry)
    currentNote = selectNote()
    showNote()
    form.reset()
})

showNote()