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


// Display our symbols as placeholders for the chosen word's letters
const placeholder = function (word) {
  const placeholderLetters = []
  for (const letter of word) {
    console.log(letter)
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
    showGuessedLetters()
  }
}


const showGuessedLetters = function () {
  // Clear the list first
  guessedLettersE.innerHTML = ""
  for (const letter of guessedLetters) {
    const li = document.createElement("li")
    li.innerText = letter
    guessedLettersE.append(li)
  }
}


const updateWordInProgress = function (guessedLetters) {
  const wordUpper = word.toUpperCase()
  const wordArray = wordUpper.split(``)
  const revealWord = []
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      revealWord.push(letter.toUpperCase())
    } else {
      revealWord.push(`●`)
    }
  }
  // console.log(revealWord);
  inProgress.innerText = revealWord.join(``)
  checkIfWin()
}


const checkIfWin = function () {
  if (word.toUpperCase() === inProgress.innerText) {
    message.classList.add("win")
    message.innerHTML = `<p class="highlight">You guessed the correct word! Great Job!</p>`
  }
}