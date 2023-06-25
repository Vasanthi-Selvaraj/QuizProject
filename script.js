//functionalities

//getting access for all the buttons
//Set variable for all the elements using DOM

const startButton=document.getElementById('start-btn');
const nextButton=document.getElementById('next-btn');
const questionContainerElement=document.getElementById('question-container');
const questionElement=document.getElementById('question');
const answerButtonsElement=document.getElementById('answer-buttons');

//functions to start quiz

//add event

startButton.addEventListener('click',startQuiz);

const questions = [
    {
      question: '01. In which US state would you find the Golden Gate Bridge?',
      answers: [
        { text: 'New York', correct: false },
        { text: 'California', correct: true },
        { text: 'Oregon', correct: false},
        { text: 'Washington', correct: false}
      ]
    },
    {
      question: 'How many stars appear on the flag of the United States?',
      answers: [
        { text: '52', correct: false },
        { text: '48', correct: false },
        { text: '55', correct: false },
        { text: '50', correct: true }
      ]
    },
    {
      question: 'On which island will you find the Statue of Liberty?',
      answers: [
        { text: 'Staten Island', correct: false },
        { text: 'Liberty Island', correct: true },
        { text: 'Ellis Island', correct: false },
        { text: 'IManhattan Island', correct: false }
      ]
    },
    {
      question: 'What is 4 * 2?',
      answers: [
        { text: '6', correct: false },
        { text: '8', correct: true }
      ]
    }
  ]
  let shuffleQuestions, currentQuestionIndex;

function startQuiz()
{
startButton.classList.add("hide");
shuffleQuestions = questions.sort(()=>Math.random()-0.5);
currentQuestionIndex=0;

 
//Display questions in random order
questionContainerElement.classList.remove("hide");
setNextQuestion();


}


//functions to go to next quiz
function setNextQuestion()
{
resetState();
showQuestion(shuffleQuestions[currentQuestionIndex]);
}

// function to display next question
function showQuestion(question)
{
questionElement.innerText= question.question;
question.answers.forEach(answers => {
   const button=document.createElement("button");
   button.innerText= answers.text;
   button.classList.add("btn");
   if(answers.correct)
   {
    button.dataset.correct= answers.correct;
   }
   button.addEventListener("click",selectAnswer);
   answerButtonsElement.appendChild(button);
});
}

function selectAnswer(e)
{
    const selectedButton= e.target;
    const correct=selectedButton.dataset.correct;
    setStatusClass(document.body,correct);
    Array.from(answerButtonsElement.children).forEach((button)=> {
        setStatusClass(button,button.dataset.correct);
    });
    if(currentQuestionIndex+1<shuffleQuestions.length){
    nextButton.classList.remove("hide");}
    else{
        startButton.innerText="Play again";
        startButton.classList.remove("hide");
    }
    nextButton.addEventListener('click',()=>{

        currentQuestionIndex++;
        setNextQuestion();
    });
}

function setStatusClass(element,correct)
{
    clearStatusClass(element);
    if(correct)
    {
        element.classList.add("correct");

    }
    else
    {
        element.classList.add("wrong");
    }
}

function clearStatusClass(element)
{
    element.classList.remove("wrong");
    element.classList.remove("correct");
    
}
function resetState()
{
    nextButton.classList.add("hide");
    while(answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}



