const guessedLetters = document.querySelector(`.guessed-letters`)
const guessButton = document.querySelector(`.guess`)
const textInput = document.querySelector(`.letter`)
const inProgress = document.querySelector(`.word-in-progress`)
const remainingGuess = document.querySelector(`.remaining`)
const remainingGuessSpan = document.querySelector(`.remaining span`)
const message = document.querySelector(`.message`)
const playButton = document.querySelector(`.play-again`)

const word = `magnolia`




const placeholder = function (word) {
  const placeholderLetters = []
  for (const letter of word) {
    console.log(letter)
    placeholderLetters.push(`●`)
  }
  inProgress.innerText = placeholderLetters.join(``)
}

placeholder(word)




guessButton.addEventListener(`click`, function(e) {
  e.preventDefault()
  const inputValue = textInput.value
  console.log(inputValue)
  textInput.value = ``
})