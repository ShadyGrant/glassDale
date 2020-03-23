import { useCriminals } from "./CriminalProvider.js"

const contentTarget = document.querySelector(".knownAssociatesContainer")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("knownAssociatesClicked", customEvent => {
    // Get the criminal id
    const criminalId = customEvent.detail.chosenCriminal

    const criminalArray = useCriminals()

    // Find returns the very first object that matches the condition in the callback function
    const criminalFound = criminalArray.find(
        (currentCriminal) => {
            if (currentCriminal.id === parseInt(criminalId)) {
                return true
            }
            return false
        }
    )

    KnownAssociatesDialog(criminalFound)

    const myFunnyDialog = document.querySelector("#associatesDialog")
    myFunnyDialog.showModal()
})

export const KnownAssociatesDialog = (criminalObject) => {
    contentTarget.innerHTML = `
        <dialog id="associatesDialog">
            ${
                criminalObject.known_associates.map(
                    (currentAssociate) => {
                        return `<div>${currentAssociate.name}</div>`
                    }
                ).join("")
            }
        </dialog>
    `
}