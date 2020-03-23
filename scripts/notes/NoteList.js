import { getNotes, useNotes } from "./NoteProvider.js"
import { Note } from "./Note.js"

const contentTarget = document.querySelector(".notesContainer")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("noteStateChanged", customEvent => {
    render()
})

eventHub.addEventListener("allNotesClicked", customEvent => {
    render()
})

const render = () => {
    getNotes().then(() => {
        const allTheNotes = useNotes()

        contentTarget.innerHTML = allTheNotes.map(
            currentNoteObject => {
                return Note(currentNoteObject)
            }
        ).join("")
    })
}