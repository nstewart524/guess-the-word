const guessedLettersE = document.querySelector(`.guessed-letters`)
const guessButton = document.querySelector(`.guess`)
const textInput = document.querySelector(`.letter`)
const inProgress = document.querySelector(`.word-in-progress`)
const remainingGuess = document.querySelector(`.remaining`)
const remainingGuessSpan = document.querySelector(`.remaining span`)
const message = document.querySelector(`.message`)
const playButton = document.querySelector(`.play-again`)

const word = `magnolia`
const guessedLetters = []



const placeholder = function (word) {
  const placeholderLetters = []
  for (const letter of word) {
    // console.log(letter)
    placeholderLetters.push(`●`)
  }
  inProgress.innerText = placeholderLetters.join(``)
}

placeholder(word)




guessButton.addEventListener(`click`, function (e) {
  e.preventDefault()
  message.innerText = ``
  const inputValue = textInput.value
  // console.log(inputValue)
  const validGuess = validate(inputValue)

  if (validGuess) {
    // We've got a letter! Let's guess!
    makeGuess(inputValue)
  }
  textInput.value = ``
})


const validate = function (inputValue) {
  const acceptedLetter = /[a-zA-Z]/
  if (inputValue.length === 0) {
    message.innerText = `Please enter any letter.`
  } else if (inputValue.length > 1) {
    message.innerText = `Please enter one letter.`
  } else if (inputValue.match(acceptedLetter)) {
    message.innerText = `Please enter a single letter.`
  } else {
    return inputValue
  }
}


const makeGuess = function (inputValue) {
  inputValue = inputValue.toUpperCase()
  if (guessedLetters.includes(inputValue)) {
    message.innerText = `You already made that selection, Try again.`
  } else {
    guessedLetters.push(inputValue)
    console.log(guessedLetters)
  }
}