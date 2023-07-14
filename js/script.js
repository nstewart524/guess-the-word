const guessedLettersE = document.querySelector(`.guessed-letters`)
const guessButton = document.querySelector(`.guess`)
const textInput = document.querySelector(`.letter`)
const inProgress = document.querySelector(`.word-in-progress`)
const remainingGuess = document.querySelector(`.remaining`)
const remainingGuessSpan = document.querySelector(`.remaining span`)
const message = document.querySelector(`.message`)
const playButton = document.querySelector(`.play-again`)

let word = `magnolia`
const guessedLetters = []
let guessesLeft = 8


const getWord = async function () {
  const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  const words = await response.text();
  const wordArray = words.split("\n");
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();
  placeholder(word);
};

// Fire off the game
getWord();


// Display our symbols as placeholders for the chosen word's letters
const placeholder = function (word) {
  const placeholderLetters = []
  for (const letter of word) {
    // console.log(letter)
    placeholderLetters.push(`●`)
  }
  inProgress.innerText = placeholderLetters.join(``)
}

// placeholder(word)

guessButton.addEventListener(`click`, function (e) {
  e.preventDefault()
  message.innerText = ``
  // grab what was in the input
  const inputValue = textInput.value
  // make sure it's a single letter
  const validGuess = validate(inputValue)

  if (validGuess) {
    makeGuess(inputValue)
  }
  textInput.value = ``
})


const validate = function (input) {
  const acceptedLetter = /[a-zA-Z]/
  if (input.length === 0) {
    message.innerText = `Please enter any letter.`
  } else if (input.length > 1) {
    message.innerText = `Please enter one letter.`
  } else if (!input.match(acceptedLetter)) {
    message.innerText = `Please enter a single letter.`
  } else {
    return input
  }
}


const makeGuess = function (inputValue) {
  inputValue = inputValue.toUpperCase()
  if (guessedLetters.includes(inputValue)) {
    message.innerText = `You already made that selection, Try again.`
  } else {
    guessedLetters.push(inputValue)
    console.log(guessedLetters)
    updateGuessesRemaining(inputValue)
    showGuessedLetters()
    updateWordInProgress(guessedLetters)
  }
}


const showGuessedLetters = function () {
  // Clear the list first
  guessedLettersE.innerHTML = ``
  for (const letter of guessedLetters) {
    const li = document.createElement(`li`)
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


const updateGuessesRemaining = function (inputValue) {
  const upperWord = word.toUpperCase()
  if (!upperWord.includes(inputValue)) {
    message.innerText = `Sorry, the word has no ${inputValue}.`
    guessesLeft -= 1
  } else {
    message.innerText = `Good guess! The word has the letter ${inputValue}.`
  }
  if (guessesLeft === 0) {
    message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`
  } else if (guessesLeft === 1) {
    remainingGuessSpan.innerText = `${guessesLeft} guess`
  } else {
    remainingGuessSpan.innerText = `${guessesLeft} guesses`
  }
}


const checkIfWin = function () {
  if (word.toUpperCase() === inProgress.innerText) {
    message.classList.add("win")
    message.innerHTML = `<p class="highlight">You guessed the correct word! Great Job!</p>`

    startOver()
  }
}


const startOver = function () {
  guessButton.classList.add('hide')
  remainingGuess.classList.add('hide')
  guessedLettersE.classList.add('hide')
  playButton.classList.remove(`hide`)
}


playAgainButton.addEventListener(`click`, function () {
  // reset all original values - grab new word
  message.classList.remove(`win`)
  guessedLetters = []
  guessesLeft = 8
  remainingGuessSpan.innerText = `${guessesLeft} guesses`
  guessedLettersE.innerHTML = ``
  message.innerText = ``
  // Grab a new word
  getWord()

   // show the right UI elements
   guessButton.classList.remove(`hide`)
   playButton.classList.add(`hide`)
   remainingGuess.classList.remove(`hide`)
   guessedLettersE.classList.remove(`hide`)
 })