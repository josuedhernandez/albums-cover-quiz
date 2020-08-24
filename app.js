/* Array to store questions and answers and images.
 * Adding relative path.
 */
const albumsquiz = {questions: [
        {
            id: cuid(), name: "NSYNC", answer: "No Strings Attached",
            options:["No Strings Attached", "Celebrity", "'N Sync", "Home for Christmas"],
            image: "images/album_covers/nsync-no-strings-attached.jpg"
        },
        {
            id: cuid(), name: "Blink-182", answer: "Nine",
            options: ["Cheshire Cat", "Dude Ranch", "Blink-182", "Nine"],
            image: "images/album_covers/blink-182-nine.jpg"
        },
        {
            id: cuid(), name: "The Offspring", answer: "Ignition",
            options: ["The Offspring", "Ignition", "Smash", "Americana"],
            image: "images/album_covers/the-offspring-ignition.jpg"
        },
        {
            id: cuid(), name: "Greenday", answer: "Kerplunk",
            options: ["Dookie", "Nimrod", "Kerplunk", "39/Smooth"],
            image: "images/album_covers/green-day-kerplunk.jpg"
        },
        {
            id: cuid(), name: "TLC", answer: "Crazysexycool",
            options: ["FanMail", "Crazysexycool", "Ooooooohhh... On the TLC Tip", "3D"],
            image: "images/album_covers/tlc-crazy-sexy-cool.jpg"
        },
        {
            id: cuid(), name: "The Smashing Pumpkins", answer: "Adore",
            options: ["Gish"," Siamese Dream", "Machina/The Machines of God", "Adore"],
            image: "images/album_covers/the-smashing-pumpkins-adore.jpg"
        },
        {
            id: cuid(), name: "NAS", answer: "Illmatic",
            options: ["Illmatic", "It Was Written", "I Am...", "Nastradamus"],
            image: "images/album_covers/nas-illmatic.jpg"
        },
        {
            id: cuid(), name: "Fiona Apple", answer: "Tidal",
            options: ["When the Pawn...", "Tidal", "Extraordinary Machine", "The Idler Wheel..."],
            image: "images/album_covers/fiona-apple-tidal.jpg"
        },
        {
            id: cuid(), name: "Mary J. Blige", answer: "Share My World",
            options: ["Share My World", "What's the 411?", "My Life", "Mary"],
            image: "images/album_covers/mary-j-blige-share-my-world.jpg"
        },
        {
            id: cuid(), name: "The rolling Stones", answer: "Stripped",
            options: ["Stripped", "Steel Wheels", "Voodoo Lounge", "Bridges to Baby"],
            image: "images/album_covers/the-rolling-stones-stripped.jpg"
        }
    ],
    question_number: 0, 
    correct: 0,
    section: "first page", 
    question_id: ""
};

  /**
   * 
   * Technical requirements:
   * 
   * Your app should include a render() function, that regenerates the view each time the store is updated. 
   * See your course material and access support for more details.
   *
   * NO additional HTML elements should be added to the index.html file.
   *
   * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
   *
   * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
   * 
   */
  
  /********** TEMPLATE GENERATION FUNCTIONS **********/

  
// These functions return HTML templates
function generateAnswersString(options) {
  // Generate Answers.
  let answersString = "", i = 0;
  options.forEach(answer => {
      answersString += `
        <div id="option${i + 1}">
          <input type="radio" name="options" id="option${i + 1}" value="${answer}" tabindex ="${i + 1}" required> 
          <label for="option${i + 1}">${answer}</label>
        </div>
      `;
      i++;
    });
  return answersString;
}

function generateQuestionstring() {
    // Generate string for questions
    let current_question = albumsquiz.questions[albumsquiz.question_number];
    let options = shuffleAnswers(current_question.options);
    albumsquiz.question_id = current_question.id;
    return `
    <h2 class="questions-count">Question #${albumsquiz.question_number + 1} out of ${albumsquiz.questions.length}</h2>
    <h2 class="score">Score: ${albumsquiz.correct}/${albumsquiz.questions.length}</h2>
    <form id="question-form" class="question-form js-question-form">
      <fieldset>
        <div class="question">
          <legend>Select the correct album title from this cover of "${current_question.name}"</legend>
          <img src="${current_question.image}" alt="Image of ${current_question.name} album">
        </div>
          <div class="options">
          <div class="answers">
            ${generateAnswersString(options)}
          </div>
        </div>
        <button type="submit" id="submit-answer" tabindex="5">Submit Answer</button>
        <button type="button" id="next-question" tabindex="6" class="hide-button"> Next Question &gt;></button>
      </fieldset>
    </form>
    `;
}

function createStartContentstring() {
    // Generate string content for starting page
    return `<div class="first-page js-first-page">
                <h2>Welcome to the 90's Albums Cover Quiz. 
                   Try to guess the album's name.</h2>
                <div class=start-screen>
                <img src="images/general/wall-with-cds.jpeg" 
                    alt="Image of CDs on stand display">
                </div>
                <div>
                    <button type="button" class="js-start">Start Quiz</button>
                </div>
            </div>`;
}

function generateLastContentString() {
    return `<div>
                <h2 class="final-score">Your final score was ${albumsquiz.correct}/${albumsquiz.questions.length}</h2>
                <button type="submit" id="js-restart">Restart Quiz</button>
            </div>`;
}

function answerEvaluationString(selection) {
    let question = albumsquiz.questions.find(element  => element.id === albumsquiz.question_id);
    if (question.answer === selection) {
        albumsquiz.correct += 1;
        return '<div class=correct-answer>Correct</div>';
    }
    else {
        return `<div class=incorrect-answer>Incorrect: the right answer is "${question.answer}"</div>`;
    }
}

  /********** RENDER FUNCTION(S) **********/
  
  // This function conditionally replaces the contents of the <main> tag based on the state of the store
  function renderQuiz() {
    // Render the quiz in the DOM
    // console.log("`renderQuiz` ran");
    // Handle content to be displayed.
    if (albumsquiz.section === "first page") {
        generateStartQuizContent();
    }
    else if (albumsquiz.section === "questions") {
        generateQuestionContent();
    }
    else if (albumsquiz.section === "last page") {
        generateLastPageContent();
    }
  }

function generateQuestionContent() {
    // Generates question content
    let startContentString = generateQuestionstring(albumsquiz.questions);

    // Insert HTML content in DOM
    $(".js-quiz-container").html(startContentString);
}

function generateStartQuizContent() {
    // Start the Quiz and display initial content
    let startContentString = createStartContentstring();

    // Insert HTML content in DOM
    $(".js-quiz-container").html(startContentString);
}

function generateLastPageContent() {
    // Generate Last Page Content
    let lastContentString = generateLastContentString();
    $(".js-quiz-container").html(lastContentString);
}
  /********** EVENT HANDLER FUNCTIONS **********/
  
  // These functions handle events (submit, click, etc)
function shuffleAnswers(answers) {
    // Use Fisher Yates shuffle method to shuffle answer.
    // Reference from https://www.w3schools.com/js/js_array_sort.asp
    // Method can be implemented to shuffle questions
    for (let i = answers.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * i)
        let k = answers[i];
        answers[i] = answers[j];
        answers[j] = k;
    }

    return answers;
}

function handleStartQuiz() {
    // Handle click on start quiz button
    $(".js-quiz-container").on("click", "button.js-start", event => {
        albumsquiz.section = "questions";
        renderQuiz();
      });
}

function handleAnswerSubmission() {
    // Handle answer submision
    $("body").on('submit', '#question-form', function(event) {
        event.preventDefault();
        // get value from checkbox checked by user
        let selectedOption = $('input[name=options]:checked');
        let evaluationString = answerEvaluationString(selectedOption.val());
        let optionid = `#${selectedOption.attr('id')}`;
        // Append Answer Evaluation
        $(optionid).append(evaluationString);
        // Toggle class to hide submit answer and show next question
        $("button").toggleClass("hide-button");
        // Disable radio input buttons
        $("input").attr('disabled', true);
      });
}

function handleNextQuestion() {
    // Handle next question content
    $(".js-quiz-container").on("click", "#next-question", event => {
        albumsquiz.question_number += 1;
        // Check to see if we finish rendering questions.
        if (albumsquiz.questions.length <= albumsquiz.question_number) {
            albumsquiz.section = "last page";
        }
        renderQuiz();
      });
}

function handleRestartQuiz() {
    // Handle restart quiz
    $(".js-quiz-container").on("click", "#js-restart", event => {
        albumsquiz.correct = 0;
        albumsquiz.question_number = 0;
        albumsquiz.question_id = "";
        albumsquiz.section = "first page";
        renderQuiz();
      });
}

// This function will be the callback when the page loads. it's responsible for
// initially rendering the quiz, and activating individual functions
// that handle the "start quiz", "selection and asnwer submit", "next question" 
// and "restart quiz".
function handleQuiz() {
    renderQuiz();
    handleStartQuiz();
    handleAnswerSubmission();
    handleNextQuestion();
    handleRestartQuiz()
  }

// when the page loads, call `handleQuiz`
$(handleQuiz);
 
