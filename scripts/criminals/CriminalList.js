import { useCriminals, getCriminals } from "./CriminalProvider.js";
import { Criminal } from "./Criminal.js";

const contentTarget = document.querySelector(".criminalsContainer")
const eventHub = document.querySelector(".container")

contentTarget.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("associates--")) {
        // Get the id of the criminal that was clicked
        const [junk, criminalId] = clickEvent.target.id.split("--")

        // Yell at the system that a known associates button was clicked
        const showAssociatesEvent = new CustomEvent("knownAssociatesClicked", {
            // Make sure to tell the system exactly which criminal button was clicked
            detail: {
                chosenCriminal: criminalId
            }
        })

        eventHub.dispatchEvent(showAssociatesEvent)
    }
})

eventHub.addEventListener("crimeChosen", event => {
    // What crime was chosen?
    const theCrimeThatWasChosen = event.detail.chosenCrime

    // Get the criminals
    let criminalsToDisplay = useCriminals()

    if (theCrimeThatWasChosen !== "0") {
        // Filter the list of criminal who committed the crime
        criminalsToDisplay = criminalsToDisplay.filter(criminal => {
            if (criminal.conviction === theCrimeThatWasChosen) {
                return true
            }
            return false
        })
    }
    render(criminalsToDisplay)
})

const render = criminalsToRender => {
    contentTarget.innerHTML = criminalsToRender.map(
        (criminalObject) => {
            return Criminal(criminalObject)
        }
    ).join("")
}

export const CriminalList = () => {
    const criminals = useCriminals()
    render(criminals)
}