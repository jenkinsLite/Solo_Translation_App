const inputTxt = document.querySelector(".input-txt")
const selectTranslation = document.querySelector(".select-translation")
const translateBtn = document.querySelector(".translate-btn")
const languageContainer = document.querySelector(".language-container")

const origSelectTranslation = document.querySelector(".select-translation").innerHTML
const origTranslateBtn = document.querySelector(".translate-btn").innerHTML
const origLanguageContainer = document.querySelector(".language-container").innerHTML

translateBtn.addEventListener("click", async () => {

    if(!translateBtn.classList.contains("translate")) {
        translateBtn.classList.add("translate")
        selectTranslation.innerHTML = origSelectTranslation 
        languageContainer.innerHTML = origLanguageContainer 
        translateBtn.innerHTML = origTranslateBtn 
    } else {

        translateBtn.disabled = true

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

            selectTranslation.textContent = "Your translation \u{1F447}"
            languageContainer.innerHTML = `<textarea type="text" class="output-txt">${data.request}</textarea>`
            translateBtn.disabled = false
            translateBtn.textContent = "Start Over"
            translateBtn.classList.remove("translate")

        } catch (error) {
            console.log("Fetch - /api/translate Error: ", error)
        }

    }

})