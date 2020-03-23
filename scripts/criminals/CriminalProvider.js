let criminals = []

export const useCriminals = () => criminals.slice()

export const getCriminals = () => {
    /*
        Load database state into application state with a fetch().
        Make sure the last `then()` sets the local `Criminals`
        variable to what is in the response from the API.
    */
   return fetch("https://criminals.glassdale.us/criminals")
    .then(response => response.json())
    .then(parsedCriminals => {
        criminals = parsedCriminals
    })
}
