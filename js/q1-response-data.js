


let userChoice = [choiceA, choiceB, choiceC];
let choicePercentage = 0;



const showData = document.getElementById('scroll-down-button');

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
  console.log('this function did something');

  const quizParams = ADL.XAPIWrapper.searchParams();
  
  quizParams['activity'] = "http://maxwellcoyle.com/xapi-test-project/Q1:%20Password%20Management";

  const queryData = await ADL.XAPIWrapper.getStatements(quizParams);
  console.log(queryData);

  const statements = await queryData.statements;

  if (statements) {
    console.log(statements);
  }
  
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
    if (response === 'question-1-A') {
      q1A += 1;
    } else if (response === 'question-1-B') {
      q1B += 1;
    } else if (response === 'question-1-C') {
      q1C += 1;
    } else {
      noAnswer += 1;
    }
  });

  userChoice.forEach(choice =>{
    if(choiceA === true) {
      choicePercentage === q1A / (q1A + q1B + q1C);
    }
    console.log(choicePercentage);
  })

  console.log(q1A);
  

  const ctx = document.getElementById('response-data').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['1 Password', '3-5 Passwords', 'Unique Password'],
        datasets: [{
            label: 'Question 1 Responses',
            data: [q1A, q1B, q1C],
            backgroundColor: [
                '#007172',
                '#D94F04',
                '#F29325'
            ],
            borderColor: [
                '#F4E2DE'
            ],
            borderWidth: 1
        }]
    }
  });

};
  
showData.addEventListener('click', get_statements);