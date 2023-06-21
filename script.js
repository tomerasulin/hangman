//Create a Hangman class that represents the game logic
class Hangman {
  word;
  remainingGuesses;
  guessedLetters = [];
  status = 'playing';

  constructor(word, remainingGuesses) {
    this.word = word.split('');
    this.remainingGuesses = remainingGuesses;
  }

  // getPuzzle() is a method that returns a string that represents the current state of the puzzle
  getPuzzle() {
    let puzzle = '';
    for (let i = 0; i < this.word.length; i++) {
      if (this.guessedLetters.includes(this.word[i])) {
        puzzle += this.word[i];
        this.guessCounter--;
      } else {
        puzzle += '*';
      }
    }

    return puzzle;
  }

  // makeGuess(guess) is a method that takes a single letter as a parameter and updates the game state accordingly
  makeGuess(guess) {
    const guessedLetters = document.getElementById('guessed-letters');

    // check if the guess is unique and valid(a single lowercase letter)
    if (guess.toLowerCase()) {
      if (!this.guessedLetters.includes(guess)) {
        this.guessedLetters.push(guess);
        guessedLetters.textContent += `${guess},`;
        this.remainingGuesses--;
      }
    }
    this.calculateStatus();
    render();
  }

  // calculateStatus() is a method that updates the status property based on the current state of the game
  calculateStatus() {
    if (!this.getPuzzle().includes('*')) {
      this.status = 'finished';
    } else if (this.remainingGuesses === 0) {
      this.status = 'failed';
    } else {
      this.status = 'playing';
    }
  }

  // getStatusMessage() is a method that returns a string that represents the current status message of the game
  getStatusMessage() {
    let status = document.getElementById('status');

    if (this.status === 'playing') {
      status.textContent = 'Remaining Guesses: ' + this.remainingGuesses;
    } else if (this.status === 'failed') {
      status.textContent = `Nice Try! The word was "${this.word.join('')}"`;
    } else {
      status.textContent = 'Great work! You guessed the word!';
    }
  }
}

// Define a global variable called hangman and assign it to a new instance of Hangman with a random word and a fixed number of guesses
// You can use any words you like, but make sure they are lowercase and have no special characters or numbers
// You can also use any number of guesses you like, but make sure it is reasonable for the difficulty level of your words
const hangman = new Hangman(generateRandomWord(), 12);

// Define a function called render() that updates the puzzle and status paragraphs with their respective values from hangman.getPuzzle() and hangman.getStatusMessage()
function render() {
  const puzzle = document.getElementById('puzzle');
  puzzle.textContent = hangman.getPuzzle();
  hangman.getStatusMessage();
}
// Call render() once at the beginning of your script to display the initial state of the game to the player

// Add an event listener to the window object that listens for the "keypress" event
window.addEventListener('keypress', (e) => {
  if (e.code.startsWith('Key')) {
    hangman.makeGuess(e.key);
  }
});

render();

function generateRandomWord() {
  const words = [
    'computer',
    'python',
    'javascript',
    'html',
    'css',
    'java',
    'ruby',
    'php',
  ];

  // Generate a random number between 0 and the length of the words array.
  const randomIndex = Math.floor(Math.random() * words.length);

  // Return the word at the random index.
  return words[randomIndex];
}
