$(document).ready(function() {
  var correctAnswers = 0;
  var incorrectAnswers = 0;
  var userCorrect;

  //Counter variable to keep track of current question
  var counter = 0;

  //Array of objects containing question: "q", possible answers: "a1", "a2", "a3", "a4", and the correct answer: "correct"
  var qacArray = [
    {
      q: "QUESTION_000_TEXT",
      a0: "ANSWER_1_TEXT",
      a1: "ANSWER_2_TEXT",
      a2: "ANSWER_3_TEXT",
      a3: "ANSWER_4_TEXT",
      correct: "ANSWER_1_TEXT"
    },

    {
      q: "QUESTION_111_TEXT",
      a0: "ANSWER_1_TEXT",
      a1: "ANSWER_2_TEXT",
      a2: "ANSWER_3_TEXT",
      a3: "ANSWER_4_TEXT",
      correct: "ANSWER_1_TEXT"
    },

    {
      q: "QUESTION_222_TEXT",
      a0: "ANSWER_1_TEXT",
      a1: "ANSWER_2_TEXT",
      a2: "ANSWER_3_TEXT",
      a3: "ANSWER_4_TEXT",
      correct: "ANSWER_1_TEXT"
    }
  ];

  //Question Screen Countdown Timer vars
  var qNumSec = 10;
  var qIntervalId;

  //Results Screen Countdown Timer vars
  var rNumSec = 1;
  var rIntervalId;

  $("#start-btn-here").append($("<button>Start</button>"));
  $("#start-btn-here").on("click", function() {
    console.log("startQuiz pressed");
    initializeQuiz();

    //Question Screen Countdown Timer
    function qCountdown() {
      qNumSec = 10;
      clearInterval(qIntervalId);
      qIntervalId = setInterval(qDecrement, 1000);
      $("#timer-here").html("<h2>&nbsp;</h2>");
    }

    function qDecrement() {
      $("#timer-here").html("<h2>" + qNumSec + "</h2>");
      qNumSec--;
      if (qNumSec === 0) {
        clearInterval(qIntervalId);
        qTimeUp();
      }
    }

    function qTimeUp() {
      console.log("Time's up!");
      incorrectAnswers++;
      console.log("incorrectAnswers: " + incorrectAnswers);
      userCorrect = false;
      displayResult();
    }

    //Results Screen Countdown Timer
    function rCountdown() {
      rNumSec = 1;
      clearInterval(rIntervalId);
      rIntervalId = setInterval(rDecrement, 1000);
    }

    function rDecrement() {
      $("#results-timer-here").html("<h2>" + rNumSec + "</h2>");
      rNumSec--;
      if (rNumSec === 0) {
        clearInterval(rIntervalId);
        if (counter === qacArray.length) {
          showFinalResults();
        } else {
          initializeQuiz();
        }
      }
    }

    function displayQuestion() {
      clearInterval(rIntervalId);
      console.log("rIntervalId: " + rIntervalId);
      $("#currentResult").hide();
      //Display the current question
      $("#currentQuestion").show();

      qCountdown();
    }

    function displayResult() {
      counter++;
      console.log("qacArray.length: " + qacArray.length);
      console.log("counter: " + counter);

      $("#currentQuestion").hide();
      //Display the current result
      $("#currentResult").show();
      if (userCorrect === true) {
        $("#feedback-here").html("Correct!");
        rCountdown();
      } else {
        $("#feedback-here").html("Incorrect!");
        rCountdown();
      }
    }

    function showFinalResults() {
      $("#currentQuestion").hide();
      $("#currentResult").hide();
      $("#finalResults").show();
      $("#correct-answers-here").html("Correct answers: " + correctAnswers);
      $("#incorrect-answers-here").html("Incorrect answers: " + incorrectAnswers);
    }

    function initializeQuiz() {
      $("#start-btn-here").hide();
      $("#finalResults").hide();
      $("#timer-here").empty();
      $("#question-here").empty();
      $("#answers-here").empty();
      $("#results-timer-here").empty();
      $("#feedback-here").empty();
      $("#media-here").empty();
      //
      displayQuestion();
      $("#question-here").html(qacArray[counter].q);
      $("#answers-here").append(
        $("<button>" + qacArray[counter].a0 + "</button>").addClass("btn"),
        $("<button>" + qacArray[counter].a1 + "</button>").addClass("btn"),
        $("<button>" + qacArray[counter].a2 + "</button>").addClass("btn"),
        $("<button>" + qacArray[counter].a3 + "</button>").addClass("btn")
      );
      //on click for divs with class of .btn
      $(".btn").on("click", function() {
        clearInterval(qIntervalId);
        clearInterval(rIntervalId);
        console.log("qIntervalId: " + qIntervalId);
        var userChoice = $(this).text();
        console.log(userChoice);
        if (userChoice === qacArray[counter].correct) {
          correctAnswers++;
          console.log("correctAnswers: " + correctAnswers);
          userCorrect = true;
          displayResult();
        } else {
          incorrectAnswers++;
          console.log("incorrectAnswers: " + incorrectAnswers);
          userCorrect = false;
          displayResult();
        }
      }); //END $(".btn").on("click", function()
    }
  });
}); //END $(document).ready(function()
