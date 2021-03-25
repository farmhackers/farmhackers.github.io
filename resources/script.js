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
    console.log("Start Test");
    $("#start").hide();
    $("#quiz").show();
    nextQuestion();
});

$('#button-yes').click(function() {
    console.log('Click Yes');
    countYes++;
    categoriesRate[questions[currentQuestion-1][1]]++;
    nextQuestion();
});

$('#button-no').click(function() {
    console.log('Click No');
    countNo++;
    nextQuestion();
});

function nextQuestion() {
    console.log('Next Question');
    currentQuestion++;
    if (currentQuestion > nbQuestions) {
        displayResult();
    }
    else {
        $('#question p').text(questions[currentQuestion-1][0]);
    }
    
};

function displayResult() {
    console.log('Affichage Resultat');
    $('#quiz').hide();

    var result = getResult();

    $('#resultats').append('<h1>' + result.title + '</h1><p>' + result.text + '</p>');

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