
/* Zoom functionality (uses medium zoom cdm) */

mediumZoom('.zoom', {
  margin: 10,
  background: "#007A78",
  scrollOffset: 100
})



const showResultsButton = document.getElementById('scroll-down-button');
const resultsDiv = document.getElementById('q2-results-section');

const question2A = document.getElementById('q2-1');
const question2B = document.getElementById('q2-2');
const question2C = document.getElementById('q2-3');
const question2D = document.getElementById('q2-4');


const Feedback2A = document.getElementById('q2-feedback-1');
const Feedback2B = document.getElementById('q2-feedback-2');
const Feedback2C = document.getElementById('q2-feedback-3');
const Feedback2D = document.getElementById('q2-feedback-4');


let choiceA = false;
let choiceB = false;
let choiceC = false;
let choiceD = false;


/* hover states for option divs */

const optionSelectorHover = (event) => {
  event.target.style.cursor = 'pointer';
  event.target.className = ('option-div-hover');
}

const optionSelectorNormal = (event) => {
  event.target.className = ('option-div');
}

question2A.addEventListener('mouseenter', optionSelectorHover);
question2A.addEventListener('mouseleave', optionSelectorNormal);

question2B.addEventListener('mouseenter', optionSelectorHover);
question2B.addEventListener('mouseleave', optionSelectorNormal);

question2C.addEventListener('mouseenter', optionSelectorHover);
question2C.addEventListener('mouseleave', optionSelectorNormal);

question2D.addEventListener('mouseenter', optionSelectorHover);
question2D.addEventListener('mouseleave', optionSelectorNormal);



/* click events for question answers */

question2A.addEventListener('click', option2A = () => {
  Feedback2A.style.display = 'block';
  question2A.style.pointerEvents = 'none';
  question2A.style.backgroundColor = '#007A78';
  question2A.style.color = '#FDFCDC';


  choiceA = true;

  question2B.style.pointerEvents = 'none';
  question2C.style.pointerEvents = 'none';
  question2D.style.pointerEvents = 'none';

  showResultsButton.style.display = 'block';
  });

question2B.addEventListener('click', option2B = () =>{
  question2B.style.backgroundColor = '#007A78';
  question2B.style.color = '#FDFCDC';
  Feedback2B.style.display = 'block';
  question2B.style.pointerEvents = 'none';
  choiceB = true;

  question2A.style.pointerEvents = 'none';
  question2C.style.pointerEvents = 'none';
  question2D.style.pointerEvents = 'none';

  showResultsButton.style.display = 'block';
  });

question2C.addEventListener('click', option2C = () =>{
  question2C.style.backgroundColor = '#007A78';
  question2C.style.color = '#FDFCDC';
  Feedback2C.style.display = 'block';
  question2C.style.pointerEvents = 'none';

  choiceC = true;
  
  question2A.style.pointerEvents = 'none';
  question2B.style.pointerEvents = 'none';
  question2D.style.pointerEvents = 'none';

  showResultsButton.style.display = 'block';
 });

question2D.addEventListener('click', option2D = () =>{
  question2D.style.backgroundColor = '#007A78';
  question2D.style.color = '#FDFCDC';
  Feedback2D.style.display = 'block';
  question2D.style.pointerEvents = 'none';

  choiceD = true;
  
  question2A.style.pointerEvents = 'none';
  question2B.style.pointerEvents = 'none';
  question2C.style.pointerEvents = 'none';

  showResultsButton.style.display = 'block';

});


const displayPercentage = document.getElementById('choice-percentage');
const displayChoiceText = document.getElementById('choice-text');
const displayChocieOutcome = document.getElementById('choice-outcome');

/* User response data */


let userChoice = [choiceA, choiceB, choiceC, choiceD];
let choicePercentage = 0;


var conf = {
  "endpoint" : "https://xapi-practica.lrs.io/xapi/",
  "auth" : "Basic " + toBase64('nombre:clave')
};

ADL.XAPIWrapper.changeConfig(conf);

let q2A = 0;
let q2B = 0;
let q2C = 0;
let q2D = 0;
let noAnswer = 0;
        
async function get_statements() {
  
  const quizParams = ADL.XAPIWrapper.searchParams();
  quizParams['activity'] = "http://maxwellcoyle.com/xapi-test-project/question-2";

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
    if (response === 'question-2-A') {
      q2A += 1;
    } else if (response === 'question-2-B') {
      q2B += 1;
    } else if (response === 'question-2-C') {
      q2C += 1;
    } else if (response === 'question-2-D') {
      q2D += 1;
    } else {
      noAnswer += 1;
    }
  });

  userChoice.forEach(choice =>{
    if(choiceA === true) {
      const sum = q2A + q2B + q2C + q2D;
      choicePercentage = ((q2A / sum) * 100).toFixed(0);
      displayPercentage.innerHTML = choicePercentage + '% of users';
      displayChoiceText.innerHTML = 'would click the link.';
      displayChocieOutcome.innerHTML = 'Your Phishing Attack Risk is High';
    } else if(choiceB === true) {
      const sum = q2A + q2B + q2C + q2D;
      choicePercentage = ((q2B / sum) * 100).toFixed(0);
      displayPercentage.innerHTML = choicePercentage + '% of users';
      displayChoiceText.innerHTML = 'would delete the email and move on.';
      displayChocieOutcome.innerHTML = 'Your Phishing Attack Risk is Medium';
    } else if(choiceC === true) {
      const sum = q2A + q2B + q2C + q2D;
      choicePercentage = ((q2C / sum) * 100).toFixed(0);
      displayPercentage.innerHTML = choicePercentage + '% of users';
      displayChoiceText.innerHTML = 'would ignore the email.';
      displayChocieOutcome.innerHTML = 'Your Phishing Attack Risk is Medium';
    } else if(choiceD === true) {
      const sum = q2A + q2B + q2C + q2D;
      choicePercentage = ((q2D / sum) * 100).toFixed(0);
      displayPercentage.innerHTML = choicePercentage + '% of users';
      displayChoiceText.innerHTML = 'would delete the email and check on the account.';
      displayChocieOutcome.innerHTML = 'Your Phishing Attack Risk is Low';
    }
    
  })


  const ctx = document.getElementById('response-data').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Click the Link', 'Delete the Email', 'Ignore the Email', 'Delete & Check on Account'],
        datasets: [{
            label: 'Question 2 Responses',
            data: [q2A, q2B, q2C, q2D],
            backgroundColor: [
                '#007172',
                '#D94F04',
                '#F29325',
                '#F4E2DE'
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
