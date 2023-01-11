const showResultsButton = document.getElementById('scroll-down-button');
const resultsDiv = document.getElementById('results-section');

const questionA = document.getElementById('q-1');
const questionB = document.getElementById('q-2');
const questionC = document.getElementById('q-3');


const FeedbackA = document.getElementById('feedback-1');
const FeedbackB = document.getElementById('feedback-2');
const FeedbackC = document.getElementById('feedback-3');

let choiceA = false;
let choiceB = false;
let choiceC = false;

/* hover states for option divs */

const optionSelectorHover = (event) => {
  event.target.style.cursor = 'pointer';
  event.target.className = ('option-div-hover');
}

const optionSelectorNormal = (event) => {
  event.target.className = ('option-div');
}

questionA.addEventListener('mouseenter', optionSelectorHover);
questionA.addEventListener('mouseleave', optionSelectorNormal);

questionB.addEventListener('mouseenter', optionSelectorHover);
questionB.addEventListener('mouseleave', optionSelectorNormal);

questionC.addEventListener('mouseenter', optionSelectorHover);
questionC.addEventListener('mouseleave', optionSelectorNormal);



/* click events for question answers */

questionA.addEventListener('click', optionA = () => {
  FeedbackA.style.display = 'block';
  questionA.style.backgroundColor = '#007A78';
  questionA.style.color = '#FDFCDC';
  questionA.style.pointerEvents = 'none';

  choiceA = true;

  questionB.style.pointerEvents = 'none';
  questionC.style.pointerEvents = 'none';

  showResultsButton.style.display = 'block';
});

questionB.addEventListener('click', optionB = () =>{
  questionB.style.backgroundColor = '#007A78';
  questionB.style.color = '#FDFCDC';
  FeedbackB.style.display = 'block';
  questionB.style.pointerEvents = 'none';

  choiceB = true;
 
  questionA.style.pointerEvents = 'none';
  questionC.style.pointerEvents = 'none';

  showResultsButton.style.display = 'block';
});

questionC.addEventListener('click', optionC = () =>{
  questionC.style.backgroundColor = '#007A78';
  questionC.style.color = '#FDFCDC';
  FeedbackC.style.display = 'block';
  questionC.style.pointerEvents = 'none';
  
  choiceC = true;

  questionA.style.pointerEvents = 'none';
  questionB.style.pointerEvents = 'none';

  showResultsButton.style.display = 'block';
  });


/* Scroll down to results */



/* User response data */


let userChoice = [choiceA, choiceB, choiceC];
let choicePercentage = 0;
const displayPercentage = document.getElementById('choice-percentage');
const displayChoiceText = document.getElementById('choice-text');
const displayChocieOutcome = document.getElementById('choice-outcome');


var conf = {
  "endpoint" : "https://xapi-practica.lrs.io/xapi/",
  "auth" : "Basic " + toBase64('nombre:clave')
};

ADL.XAPIWrapper.changeConfig(conf);

let q1A = 0;
let q1B = 0;
let q1C = 0;
let noAnswer = 0;
        
async function get_statements() {

  console.log('function fired');
  
  const quizParams = ADL.XAPIWrapper.searchParams();
  quizParams['activity'] = "http://maxwellcoyle.com/xapi-test-project/question-5";

  const queryData = await ADL.XAPIWrapper.getStatements(quizParams);
  console.log(queryData);

  const statements = await queryData.statements;
  
  let responseData = [];

  statements.forEach(statement => {
    if (statement.result) {
      responseData.push(statement.result.response);
    } else {
      console.log('error');
    }
  });
  
  console.log(responseData);

  responseData.forEach(response => {
    if (response === 'question-5-A') {
      q1A += 1;
    } else if (response === 'question-5-B') {
      q1B += 1;
    } else if (response === 'question-5-C') {
      q1C += 1;
    } else {
      noAnswer += 1;
    }
  });

  userChoice.forEach(choice =>{
    const sum = q1A + q1B + q1C;
    if(choiceA === true) {
      
      choicePercentage = ((q1A / sum) * 100).toFixed(0);
      displayPercentage.innerHTML = choicePercentage + '% of participants';
      displayChoiceText.innerHTML = 'Are too busy to worry about data breaches.';
      displayChocieOutcome.innerHTML = 'Your Risk is High';
    } else if(choiceB === true) {
      
      choicePercentage = ((q1B / sum) * 100).toFixed(0);
      displayPercentage.innerHTML = choicePercentage + '% of participants';
      displayChoiceText.innerHTML = 'Rely on their identify theft protection.';
      displayChocieOutcome.innerHTML = 'Your Risk is Medium';
    } else if(choiceC === true) {
      
      choicePercentage = ((q1C / sum) * 100).toFixed(0);
      displayPercentage.innerHTML = choicePercentage + '% of participants';
      displayChoiceText.innerHTML = 'Would contact the company to check up on personal data.';
      displayChocieOutcome.innerHTML = 'Your Risk is Low';
    }
    
  })


  const ctx = document.getElementById('response-data').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['1 Password', '3-5 Passwords', 'Unique Password'],
        datasets: [{
            label: 'Question 5 Responses',
            data: [q1A, q1B, q1C],
            backgroundColor: [
                '#D94F04',
                '#F29325',
                '#007172'
            ],
            borderColor: [
                '#F4E2DE'
            ],
            borderWidth: 1
        }]
    },
    options: {
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });

  resultsDiv.style.display = 'block';
  resultsDiv.scrollIntoView({
    behavior: 'smooth' 
  });

};
  
showResultsButton.addEventListener('click', get_statements);




/* Learning section tab interaction */


document.getElementById('defaultOpen').click();

function openCity(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}
