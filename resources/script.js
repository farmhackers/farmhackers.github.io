$(document).ready(function() {
    $("#button-start").show();
});

var countYes = countNo = currentQuestion = 0;

var nbQuestions = questions.length;

var categoriesRate = new Array();
for (key in categories) {
    categoriesRate[key] = 0;
}

var categoriesMax = new Array();
for (let i = 0; i < nbQuestions; i++) {
    var idCat = questions[i][1];
    if (typeof categoriesMax[idCat] === 'undefined') {
        categoriesMax[idCat] = 1;
    } else {
        categoriesMax[idCat]++;
    }
}

$("#button-start").click(function() {
    $("#start").hide();
    $("#quiz").show();
    nextQuestion();
});

$('#button-yes').click(function() {
    countYes++;
    categoriesRate[questions[currentQuestion-1][1]]++;
    nextQuestion();
});

$('#button-no').click(function() {
    countNo++;
    nextQuestion();
});

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion > nbQuestions) {
        displayResult();
    }
    else {
        $('#question p').text(questions[currentQuestion-1][0]);
    }
    
};

function displayResult() {
    $('#quiz').hide();

    var result = getResult();

    $('#resultats').append('<h1 class="text-center">' + result.title + '</h1><p class="text-justify fw-bold">' + result.text + '</p>');

    for (key in categories) {
        $('#resultats').append('<p>Réponses positives sur ' + categories[key].label + ' <span class="badge bg-warning text-dark">' + Math.round(categoriesRate[key]/categoriesMax[key]*100) + '%</span></p>')
    }

    $('#resultats').show();
}

function getResult() {
    var result = new Object();
    if (countYes == nbQuestions) {
        result = results[0];
    }
    else if (countNo == nbQuestions) {
        result = results[3];  
    }
    else if (countYes > countNo) {
        result = results[1];  
    }
    else {
        result = results[2];  
    }

    return result;
}