/*global $:true*/

var RED = '#ea4335'
var GREEN = '#34a853'
var BLUE = '#4285f4'
var YELLOW = '#fbbc05'
var COLORS = [BLUE, GREEN, YELLOW, RED]
var SOLUTION = [BLUE, RED, YELLOW, BLUE, GREEN, RED]
var guessCount = 0

$('body').on('click', '.letter', function(ev) {
    var el = $(ev.currentTarget)
    var idx = el.data('idx')
    idx = idx == undefined ? 0 : (idx + 1) % COLORS.length
    el.data('idx', idx)
    var color = COLORS[idx]
    el.css('background-color', color)
})


function check() {
    var isCorrect = []
    var score = 0
    for (var i in SOLUTION) {
        var el = $('#l' + i)
        var idx = el.data('idx')
        var color = COLORS[idx]
        isCorrect[i] = (SOLUTION[i] == color)
        if (isCorrect[i]) score++
    }
    return {
        isCorrect: isCorrect,
        score: score
    }
}


$('body').on('click', '.getGrade', function() {
    guessCount++
    var result = check()
    var resultText
    if (result.score < 6) {
        resultText = result.score + '/6'
    } else {
        resultText = 'WINNER!!!'
    }
    for (var i in result.isCorrect) {
        if (!result.isCorrect[i]) {
            $('#l' + i).css('background-color', 'gray')
        }
    }
    var guessText = guessCount == 1 ? ' guess.' : ' guesses.'
    $('#gradeOutput').text(resultText + ' after ' + guessCount + guessText)
})
