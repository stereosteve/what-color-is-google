/*global $:true*/

var GRAY = '#ccc';
var RED = '#ea4335'
var GREEN = '#34a853'
var BLUE = '#4285f4'
var YELLOW = '#fbbc05'
var COLORS = [GRAY, BLUE, GREEN, YELLOW, RED]
var SOLUTION = [1, 4, 3, 1, 2, 4]
var guess = [0, 0, 0, 0, 0, 0]
var guessCount = 0

var button, response, message, guesses
var letters = []

var responses = [
    'You are correct!',
    'Close! You only have one wrong.',
    'Whoops, you need to fix two!',
    'Try again, you only got half of them right.',
    'Not quite, you have four mistakes.',
    'So...you only got one right, try again.',
    'Zero correct, sheesh.'
]

window.onblur = function(e) {
    document.title = 'Cheating?';
}

window.onfocus = function(e) {
    document.title = 'What Color Is Google?';
    $('#lucky').text("I'm Feeling Evil");
    responses[0] += ' But you probably snuck a look when you went to that other tab.'
}

$(document).ready(function() {
    button = $('#lucky')
    response = $('#response')
    message = $('#message')
    guesses = $('#guesses')
    for (var i = 0; i < 6; i++) {
        letters.push($('#l' + i));
    }

    $('body').on('click', '.letter', clickLetter)
    $('body').on('click', '#lucky', checkSolution)

    showIntro();
})

function clickLetter(ev) {
    var el = $(ev.currentTarget)
    var i = parseInt(el.attr('data-index'))
    guess[i] = guess[i] === COLORS.length - 1 ? 1 : guess[i] + 1
    paintLetter(i, guess[i])
    toggleGuessButton()
}

function paintLetter(letterIndex, colorIndex) {
    letters[letterIndex].css('background-color', COLORS[colorIndex])
}

function showIntro() {
    var numLoops = 6
    var delay = 250

    for (var i = 0; i <= numLoops; i++) {
        paintAll(i);
    }

    function paintAll(loop) {
        setTimeout(function() {
            for (var j = 0; j < 6; j++) {
                var colorIndex = loop === numLoops ? 0 : getRandomColorIndex()
                paintLetter(j, colorIndex)
            }
        }, loop * delay)
    }
}

function getRandomColorIndex() {
    return Math.floor(Math.random() * (COLORS.length - 1)) + 1
}

function toggleGuessButton() {
    var letterNeedsColor = !guess.reduce(function(x, val) { return x * val })
    button.toggleClass('is-disabled', letterNeedsColor)
}

function getNumberWrong() {
    var numWrong = 0
    for (var i = 0; i < SOLUTION.length; i++) {
        if (SOLUTION[i] !== guess[i]) {
            numWrong++
        }
    }
    return numWrong
}

function checkSolution() {
    guessCount++
    message.text(responses[getNumberWrong()])
    guesses.text('Guess #' + guessCount)
}
