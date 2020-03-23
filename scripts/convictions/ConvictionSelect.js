/*
 *   ConvictionSelect component that renders a select HTML element
 *   which lists all convictions in the Glassdale PD API
 */
import { useConvictions } from "./ConvictionProvider.js"

// Get a reference to the DOM element where the <select> will be rendered
const contentTarget = document.querySelector(".filters__crime")
const eventHub = document.querySelector(".container")

contentTarget.addEventListener("change", changeEvent => {
    if (changeEvent.target.id === "crimeSelect") {
        const theCrimeThatWasChosen = changeEvent.target.value

        const crimeChosenEvent = new CustomEvent("crimeChosen", {
            detail: {
                chosenCrime: theCrimeThatWasChosen
            }
        })

        eventHub.dispatchEvent(crimeChosenEvent)
    }
})

const ConvictionSelect = () => {
    // Get all convictions from application state
    const convictions = useConvictions()

    const render = (convictionsCollection) => {
        /*
            Use interpolation here to invoke the map() method on
            the convictionsCollection to generate the option elements.
            Look back at the example provided above.
        */
        contentTarget.innerHTML = `
            <select class="dropdown" id="crimeSelect">
                <option value="0">Please select a crime...</option>
                ${
                    convictionsCollection.map(singleConviction => {
                        return `<option>${singleConviction.name}</option>`
                    })
                }
            </select>
        `
    }

    render(convictions)
}

export default ConvictionSelect