const inputTxt = document.querySelector(".input-txt")
const translateBtn = document.querySelector(".translate-btn")

translateBtn.addEventListener("click", async () => {

    const language = document.querySelector("input[name=language]:checked")
    const postBody = { language: language.value, translateTxt: inputTxt.value }

    try {

        const response = await fetch("/api/translate", {
            method: 'POST',
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify(postBody)
        })

        if (!response.ok) {
            console.log("!response.ok. response is: ", response)
        }
        const data = await response.json()

        console.log("response from server: ", data.request)

    } catch (error) {
        console.log("Fetch - /api/translate Error: ", error)
    }

})