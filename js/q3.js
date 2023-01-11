/* Zoom functionality (uses medium zoom cdm) */

mediumZoom('.zoom', {
  margin: 10,
  background: "#007A78",
  scrollOffset: 100
})



let choiceA = false;
let choiceB = false;
let choiceC = false;
let choiceD = false;



const showResultsButton = document.getElementById('scroll-down-button');
const resultsDiv = document.getElementById('q3-results-section');

const question3A = document.getElementById('q3-1');
const question3B = document.getElementById('q3-2');
const question3C = document.getElementById('q3-3');
const question3D = document.getElementById('q3-4');


const Feedback3A = document.getElementById('q3-feedback-1');
const Feedback3B = document.getElementById('q3-feedback-2');
const Feedback3C = document.getElementById('q3-feedback-3');
const Feedback3D = document.getElementById('q3-feedback-4');


/* hover states for option divs */

const optionSelectorHover = (event) => {
  event.target.style.cursor = 'pointer';
  event.target.className = ('option-div-hover');
}

const optionSelectorNormal = (event) => {
  event.target.className = ('option-div');
}

question3A.addEventListener('mouseenter', optionSelectorHover);
question3A.addEventListener('mouseleave', optionSelectorNormal);

question3B.addEventListener('mouseenter', optionSelectorHover);
question3B.addEventListener('mouseleave', optionSelectorNormal);

question3C.addEventListener('mouseenter', optionSelectorHover);
question3C.addEventListener('mouseleave', optionSelectorNormal);

question3D.addEventListener('mouseenter', optionSelectorHover);
question3D.addEventListener('mouseleave', optionSelectorNormal);



/* click events for question answers */

question3A.addEventListener('click', option3A = () => {
  Feedback3A.style.display = 'block';
  question3A.style.pointerEvents = 'none';
  question3A.style.backgroundColor = '#007A78';
  question3A.style.color = '#FDFCDC';

  choiceA = true;

  question3B.style.pointerEvents = 'none';
  question3C.style.pointerEvents = 'none';
  question3D.style.pointerEvents = 'none';

  showResultsButton.style.display = 'block';

});

question3B.addEventListener('click', option3B = () =>{
  question3B.style.backgroundColor = '#007A78';
  question3B.style.color = '#FDFCDC';
  Feedback3B.style.display = 'block';
  question3B.style.pointerEvents = 'none';

  choiceB = true;

  question3A.style.pointerEvents = 'none';
  question3C.style.pointerEvents = 'none';
  question3D.style.pointerEvents = 'none';

  showResultsButton.style.display = 'block';

});

question3C.addEventListener('click', option3C = () =>{
  question3C.style.backgroundColor = '#007A78';
  question3C.style.color = '#FDFCDC';
  Feedback3C.style.display = 'block';
  question3C.style.pointerEvents = 'none';
  
  choiceC = true;

  question3A.style.pointerEvents = 'none';
  question3B.style.pointerEvents = 'none';
  question3D.style.pointerEvents = 'none';

  showResultsButton.style.display = 'block';
  });

question3D.addEventListener('click', option3D = () =>{
  question3D.style.backgroundColor = '#007A78';
  question3D.style.color = '#FDFCDC';
  Feedback3D.style.display = 'block';
  question3D.style.pointerEvents = 'none';
  
  choiceD = true;

  question3A.style.pointerEvents = 'none';
  question3B.style.pointerEvents = 'none';
  question3C.style.pointerEvents = 'none';

  showResultsButton.style.display = 'block';

});



const displayPercentage = document.getElementById('choice-percentage');
const displayChoiceText = document.getElementById('choice-text');
const displayChocieOutcome = document.getElementById('choice-outcome');
const displayChoiceDescription = document.getElementById('choice-description');

/* User response data */


let userChoice = [choiceA, choiceB, choiceC, choiceD];
let choicePercentage = 0;


var conf = {
  "endpoint" : "https://xapi-practica.lrs.io/xapi/",
  "auth" : "Basic " + toBase64('nombre:clave')
};

ADL.XAPIWrapper.changeConfig(conf);

let q3A = 0;
let q3B = 0;
let q3C = 0;
let q3D = 0;
let sum = 0;
let noAnswer = 0;
        
async function get_statements() {
  
  const quizParams = ADL.XAPIWrapper.searchParams();
  quizParams['activity'] = "http://maxwellcoyle.com/xapi-test-project/question-3";

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
    if (response === 'question-3-A') {
      q3A += 1;
    } else if (response === 'question-3-B') {
      q3B += 1;
    } else if (response === 'question-3-C') {
      q3C += 1;
    } else if (response === 'question-3-D') {
      q3D += 1;
    } else {
      noAnswer += 1;
    }
  });

  userChoice.forEach(choice =>{
    if(choiceA === true) {
      sum = q3A + q3B + q3C + q3D;
      choicePercentage = ((q3A / sum) * 100).toFixed(0);
      displayPercentage.innerHTML = choicePercentage + '% of users';
      displayChoiceText.innerHTML = 'Chose option A.';
      displayChoiceDescription.innerHTML = 'Check out the content below for some tips on how to spot phishing attacks in the future.'
    } else if(choiceB === true) {
      sum = q3A + q3B + q3C + q3D;
      choicePercentage = ((q3B / sum) * 100).toFixed(0);
      displayPercentage.innerHTML = choicePercentage + '% of users';
      displayChoiceText.innerHTML = 'Chose option B.';
      displayChoiceDescription.innerHTML = 'Check out the content below for some tips on how to spot phishing attacks in the future.'
    } else if(choiceC === true) {
      sum = q3A + q3B + q3C + q3D;
      choicePercentage = ((q3C / sum) * 100).toFixed(0);
      displayPercentage.innerHTML = choicePercentage + '% of users';
      displayChoiceText.innerHTML = 'Chose option C.';
      displayChoiceDescription.innerHTML = 'Check out the content below for some tips on how to spot phishing attacks in the future.'
    } else if(choiceD === true) {
      sum = q3A + q3B + q3C + q3D;
      choicePercentage = ((q3D / sum) * 100).toFixed(0);
      displayPercentage.innerHTML = choicePercentage + '% of users';
      displayChoiceText.innerHTML = 'Chose option D.';
      displayChocieOutcome.innerHTML = 'You answered correctly!';
      displayChoiceDescription.innerHTML = 'Check out the content below to sure up your phishing security skills.'
    }
    
  })


  const ctx = document.getElementById('response-data').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Option A', 'Option B', 'Option C', 'Option D - Correct'],
        datasets: [{
            label: 'Question 3 Responses',
            data: [q3A, q3B, q3C, q3D],
            backgroundColor: [
                '#c0d7d6',
                '#F07167',
                '#ffccc5',
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

