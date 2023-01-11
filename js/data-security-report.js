
const getStatements = document.getElementById('get-statements');
let userName = localStorage.getItem('user');

let yourScore = document.getElementById('your-score');


var conf = {
  "endpoint" : "https://xapi-practica.lrs.io/xapi/",
  "auth" : "Basic " + toBase64('nombre:clave')
};

ADL.XAPIWrapper.changeConfig(conf);

/* GLOBAL VARIABLE */

let optionA = 0;
let optionB = 0;
let optionC = 0;
let noAnswer = 0;
        
let q1UserRisk = 0;
let q2UserRisk = 0;
let q3UserRisk = 0;
let q4UserRisk = 0;
let q5UserRisk = 0;

let groupResponses = [];
let groupNames = [];

let qStatements = [];


let tip1 = document.getElementById('tip-1');
let tip2 = document.getElementById('tip-2');
let tip3 = document.getElementById('tip-3');


async function get_statements() {

  const quizParams1 = ADL.XAPIWrapper.searchParams();
  quizParams1['answered'] = "http://adlnet.gov/expapi/verbs/answered";
  const qQueryData = await ADL.XAPIWrapper.getStatements(quizParams1);
  // console.log(qQueryData);

  qStatements = await qQueryData.statements;

/* AVERAGE RESPONSE DATA */ 
  qStatements.forEach(statement => {
    if (statement.result) {
      groupResponses.push(statement.result.response);
      groupNames.push(statement.actor.name);
    }
  })
  // console.log(groupResponses);
  // console.log(groupNames);

  let q1GroupTotalRisk = 0;
  let q1NumOfResponses = 0;

  let q2GroupTotalRisk = 0;
  let q2NumOfResponses = 0;

  let q3GroupTotalRisk = 0;
  let q3NumOfResponses = 0;

  let q4GroupTotalRisk = 0;
  let q4NumOfResponses = 0;

  let q5GroupTotalRisk = 0;
  let q5NumOfResponses = 0;

  groupResponses.forEach(response => {
    if (response === 'question-1-A') {
      q1GroupTotalRisk += 4;
      q1NumOfResponses += 1;
    } else if (response === 'question-1-B') {
      q1GroupTotalRisk += 2.5;
      q1NumOfResponses += 1;
    } else if (response === 'question-1-C') {
      q1GroupTotalRisk += 1;
      q1NumOfResponses += 1;
    } 

    else if (response === 'question-2-A') {
      q2GroupTotalRisk += 4;
      q2NumOfResponses += 1;
    } else if (response === 'question-2-B') {
      q2GroupTotalRisk += 2;
      q2NumOfResponses += 1;
    } else if (response === 'question-2-C') {
      q2GroupTotalRisk += 3;
      q2NumOfResponses += 1;
    } else if (response === 'question-2-D') {
      q2GroupTotalRisk += 1;
      q2NumOfResponses += 1;
    } 

    else if (response === 'question-3-A') {
      q3GroupTotalRisk += 4;
      q3NumOfResponses += 1;
    } else if (response === 'question-3-B') {
      q3GroupTotalRisk += 2;
      q3NumOfResponses += 1;
    } else if (response === 'question-3-C') {
      q3GroupTotalRisk += 3;
      q3NumOfResponses += 1;
    } else if (response === 'question-3-D') {
      q3GroupTotalRisk += 1;
      q3NumOfResponses += 1;
    } 

    else if (response === 'question-4-A') {
      q4GroupTotalRisk += 4;
      q4NumOfResponses += 1;
    } else if (response === 'question-4-B') {
      q4GroupTotalRisk += 2.5;
      q4NumOfResponses += 1;
    } else if (response === 'question-4-C') {
      q4GroupTotalRisk += 1;
      q4NumOfResponses += 1;
    } 

    else if (response === 'question-5-A') {
      q5GroupTotalRisk += 4;
      q5NumOfResponses += 1;
    } else if (response === 'question-5-B') {
      q5GroupTotalRisk += 2.5;
      q5NumOfResponses += 1;
    } else if (response === 'question-5-C') {
      q5GroupTotalRisk += 1;
      q5NumOfResponses += 1;
    } 
  })

  q1Average = q1GroupTotalRisk / q1NumOfResponses;
  q1Average = q1Average.toFixed(2);

  q2Average = q2GroupTotalRisk / q2NumOfResponses;
  q2Average = q2Average.toFixed(2);

  q3Average = q3GroupTotalRisk / q3NumOfResponses;
  q3Average = q3Average.toFixed(2);

  q4Average = q4GroupTotalRisk / q4NumOfResponses;
  q4Average = q4Average.toFixed(2);

  q5Average = q5GroupTotalRisk / q5NumOfResponses;
  q5Average = q5Average.toFixed(2);

  // console.log(q1Average);
  // console.log(q2Average);
  // console.log(q3Average);
  // console.log(q4Average);
  // console.log(q5Average);

/* USER RESPONSE DATA */
  let userResponses = [];
  let totalUserRisk = 0;

  qStatements.forEach(statement => {
    if (statement.actor.name === userName) {
      userResponses.push(statement.result.response);
    }
  })

  // console.log(groupResponses);

  userResponses.forEach(response => {
    if (response === 'question-1-A') {
      q1UserRisk += 4;
      totalUserRisk += 4;
    } else if (response === 'question-1-B') {
      q1UserRisk += 2.5;
    } else if (response === 'question-1-C') {
      q1UserRisk += 1;
    } 
    
      else if (response === 'question-2-A') {
      q2UserRisk += 4;
    } else if (response === 'question-2-B') {
      q2UserRisk += 2;
    } else if (response === 'question-2-C') {
      q2UserRisk += 3;
    } else if (response === 'question-2-D') {
      q2UserRisk += 1;
    } 

    else if (response === 'question-3-A') {
      q3UserRisk += 4;
    } else if (response === 'question-3-B') {
      q3UserRisk += 2;
    } else if (response === 'question-3-C') {
      q3UserRisk += 3;
    } else if (response === 'question-3-D') {
      q3UserRisk += 1;
    } 

    else if (response === 'question-4-A') {
      q4UserRisk += 4;
    } else if (response === 'question-4-B') {
      q4UserRisk += 2.5;
    } else if (response === 'question-4-C') {
      q4UserRisk += 1;
    } 

    else if (response === 'question-5-A') {
      q5UserRisk += 4;
    } else if (response === 'question-5-B') {
      q5UserRisk += 2.5;
    } else if (response === 'question-5-C') {
      q5UserRisk += 1;
    } 
  });

  let totalUserScore = q1UserRisk + q2UserRisk + q3UserRisk + q4UserRisk + q5UserRisk;

  if (totalUserScore > 15) {
    yourScore.innerHTML = totalUserScore;
    yourScore.style.color = '#007172';
  } else if (totalUserScore > 10) {
    yourScore.innerHTML = totalUserScore;
    yourScore.style.color = '#FFE1DD';
  } else {
    yourScore.innerHTML = totalUserScore;
    yourScore.style.color = '#D94F04';
  }

  const labels = [
    'Password Management',
    'Phishing Detection',
    'Email Security',
    'Software Vulnerabilities',
    'Data Breach Management'
  ];
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Average Risk',
        fill: true,
        backgroundColor: 'rgb(0, 113, 114, .5)',
        borderColor: '#007172',
        pointBackgroundColor: '#007172',
        data: [q1Average, q2Average, q3Average, q4Average, q5Average],
      },
      {
        label: 'Your Risk',
        fill: true,
        offset: true,
        backgroundColor: '#FFE1DD',
        borderColor: '#D94F04',
        pointBackgroundColor: '#D94F04',
        data: [q1UserRisk, q2UserRisk, q3UserRisk, q4UserRisk, q5UserRisk],
      }
    ]
  };

  const chart = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(chart, {
      type: 'line',
      data: data,
      options: {
        scales: {
          y: {
            ticks: {
              color: '#D94F04',
              font: {
                weight: 'bold',
                family: "'Poppins', sans-serif"
              }
            }
          },
          x: {
            ticks: {
              color: '#007172',
              font: {
                weight: 'bold',
                family: "'Poppins', sans-serif"
              },
            }
          }
        },
        responsive: true,
        offset: true,
        plugins: {
          title: {
            display: true,
            position: 'top',
            align: 'left',
            padding: 20,
            fullSize: false,
            text: "See where you're vulnerable.",
            color: '#D94F04',
            font: {
              size: 20,
              family: "'Poppins', sans-serif",
            }
          },
          legend: {
            display: true,
            position: 'left',
            labels: {
              font: {
                size: 14,
                family: "'Poppins', sans-serif"
              },
              position: 'bottom'
            }
          },
          labels: {
            font: {
              size: 20,
              family: "'Poppins', sans-serif",
              weight: 'bold'
            }
          }
        }
      }
  });


};


/* Event listener to retrieve statements from the LRS */


window.addEventListener('load', get_statements);


let userRiskLow = false;
let userRiskMedium = false;
let userRiskHigh = false;


/* determine the user Risk Score */
let lowRiskCardView = document.getElementById('low-risk')
let medRiskCardView = document.getElementById('med-risk');
let highRiskCardView = document.getElementById('high-risk');

async function determineUserScore() {

  let userResponseNumbers = [q1UserRisk, q2UserRisk, q3UserRisk, q4UserRisk, q5UserRisk];
  // console.log(userResponseNumbers);

  let userFinalRiskScore = userResponseNumbers.reduce((partialSum, a) => partialSum + a, 0);
  // console.log(userFinalRiskScore);

  if (userFinalRiskScore >= 15) {
    userRiskHigh = true;
    highRiskCardView.style.display = 'block';
    // console.log(userRiskHigh);

  } else if (userFinalRiskScore >= 10) {
    userRiskMedium = true;
    medRiskCardView.style.display = 'block';
    // console.log(userRiskMedium);

  } else {
    userRiskLow = true;
    lowRiskCardView.style.display = 'block'
    // console.log(userRiskLow);
  }

  let strengthTitle = document.getElementById('strength-title');
  let strengthContent = document.getElementById('strength-content');
  let weaknessTitle = document.getElementById('weakness-title');
  let weaknessContent = document.getElementById('weakness-content');


  // console.log(userResponseNumbers);

  let lowest = 0;

  const indexOfMin = function(a) {

    for (let i = 1; i < a.length; i++) {
      if (a[i] < a[lowest]) lowest = i;
    }
    // console.log(lowest);
    return lowest;
  }

  // console.log(lowest);
  indexOfMin(userResponseNumbers);

  if (lowest === 0) {
    // console.log(lowest);
    strengthTitle.innerHTML = 'Password Management';
    strengthContent.innerHTML = 'Password Management - A high risk score means that you are an easy target for data attacks. Don’t fret! You’ve made it this far which means that you’ve already learned a few tricks to better protect your personal data online.';
    // console.log('Strength: Password Management');
  } else if (lowest === 1) {
    strengthTitle.innerHTML = 'Phishing Attacks';
    strengthContent.innerHTML = 'Phishing Attacks - A high risk score means that you are an easy target for data attacks. Don’t fret! You’ve made it this far which means that you’ve already learned a few tricks to better protect your personal data online.';
    // console.log('Strength: Phishing Attcks');
  } else if (lowest === 2) {
    strengthTitle.innerHTML = 'Email Security';
    strengthContent.innerHTML = 'Email Security - A high risk score means that you are an easy target for data attacks. Don’t fret! You’ve made it this far which means that you’ve already learned a few tricks to better protect your personal data online.';
    // console.log('Strength: Email Security');
  } else if (lowest === 3) {
    strengthTitle.innerHTML = 'Software Exposure';
    strengthContent.innerHTML = 'Software Exposure - A high risk score means that you are an easy target for data attacks. Don’t fret! You’ve made it this far which means that you’ve already learned a few tricks to better protect your personal data online.';
    // console.log('Strength: Software Exposure');
  } else if (lowest === 4) {
    strengthTitle.innerHTML = 'Data Breach Monitoring';
    strengthContent.innerHTML = 'Data Breach Monitoring - A high risk score means that you are an easy target for data attacks. Don’t fret! You’ve made it this far which means that you’ve already learned a few tricks to better protect your personal data online.';

    // console.log('Strength: Data Breach Monitoring');
  }

  let highest = 0;

  const indexOfMax = function(a) {

    for (let i = 1; i < a.length; i++) {
      if (a[i] > a[highest]) highest = i;
    }
    // console.log(highest);
    return highest;
  }

  // console.log(highest);
  indexOfMax(userResponseNumbers);

  if (highest === 0) {
    weaknessTitle.innerHTML = 'Password Management';
    weaknessContent.innerHTML = 'Password Management - A high risk score means that you are an easy target for data attacks. Don’t fret! You’ve made it this far which means that you’ve already learned a few tricks to better protect your personal data online.'
    tip1.innerHTML = '1. Use a password manager. Check out <a target="_blank" href="https://passwords.google.com/">Google’s password manager here.</a>';
    tip2.innerHTML = '2. Make sure that important accounts, like online banking accounts, each have a unique and complex password.';
    tip3.innerHTML = '3. Use 2-step verification. Check out <a target="_blank" href="https://www.microsoft.com/en-us/security/mobile-authenticator-app">Microsoft Authenticator app here.';
  } else if (highest === 1) {
    weaknessTitle.innerHTML = 'Phishing Attacks';
    weaknessContent.innerHTML = 'Phishing Attacks - A high risk score means that you are an easy target for data attacks. Don’t fret! You’ve made it this far which means that you’ve already learned a few tricks to better protect your personal data online.'
    tip1.innerHTML = '1. Don’t click on attachments or links that arrive in your email inbox. ';
    tip2.innerHTML = '2. Never trust any email or phone call that is requesting sensitive information. ';
    tip3.innerHTML = '3. Be especially aware of emails with urgent subject lines.  ';
  } else if (highest === 2) {
    weaknessTitle.innerHTML = 'Email Security';
    weaknessContent.innerHTML = 'Email Security - A high risk score means that you are an easy target for data attacks. Don’t fret! You’ve made it this far which means that you’ve already learned a few tricks to better protect your personal data online.'
    tip1.innerHTML = '1. Keep an eye out for emails with grammar, spelling, or formatting mistakes.';
    tip2.innerHTML = '2. Be aware of any email coming from an unfamiliar address or that has an unusual greeting or subject line.';
    tip3.innerHTML = '3. Delete any email requesting account credentials, payment information, or sensitive data.';
  } else if (highest === 3) {
    weaknessTitle.innerHTML = 'Software Exposure';
    weaknessContent.innerHTML = 'Software Exposure - A high risk score means that you are an easy target for data attacks. Don’t fret! You’ve made it this far which means that you’ve already learned a few tricks to better protect your personal data online.';
    tip1.innerHTML = '1. Turn on automatic software updates in your system settings. ';
    tip2.innerHTML = '2. Back up your data in the cloud or with an external hard drive.';
  } else if (highest === 4) {
    weaknessTitle.innerHTML = 'Data Breach Monitoring';
    weaknessContent.innerHTML = 'Data Breach Monitoring - A high risk score means that you are an easy target for data attacks. Don’t fret! You’ve made it this far which means that you’ve already learned a few tricks to better protect your personal data online.';
    tip1.innerHTML = '1. Use Multi-factor authentication when available. Check out <a target="_blank" href="https://www.microsoft.com/en-us/security/mobile-authenticator-app">Microsoft Authenticator app here.';
    tip2.innerHTML = '2. Set up account alerts on bank accounts. ';
    tip3.innerHTML = '3. Use a credit card when shopping online to protect your checking account. ';
    // console.log('Weakness: Data Breach Monitoring');
  }


};

window.addEventListener('load', determineUserScore);


let firstScore = '';
let secondScore = '';
let thirdScore = '';
let forthScore = '';
let fifthScore = '';

let firstScoreName = '';
let secondScoreName = '';
let thirdScoreName = '';
let forthScoreName = '';
let fifthScoreName = '';


async function determineTop10Scores() {

  let currentUserScore = 0;
  let currentUserSelection = "";
  let currentUserName = '';

  let userGroup = [];
  let scoreGroup = [];

  const getTheUsersScore = function(a) {

    // console.log(qStatements);

    for (let i = 1; i < a.length; i++) {
      if (a[i].actor.name !== currentUserName) {
        currentUserName = a[i].actor.name;
        // console.log(currentUserName);
        currentUserSelection = a[i].result.response;
        // console.log(currentUserSelection);

        userGroup.push(currentUserName);

        if (currentUserSelection === 'question-1-A') {
          currentUserScore += 1;
          // console.log(currentUserScore);
        } else if (currentUserSelection === 'question-1-B') {
          currentUserScore += 2.5;
          // console.log(currentUserScore);
        } else if (currentUserSelection === 'question-1-C') {
          currentUserScore += 4;
          // console.log(currentUserScore);
        } else if (currentUserSelection === 'question-2-A') {
          currentUserScore += 1;
          // console.log(currentUserScore);
        } else if (currentUserSelection === 'question-2-B') {
          currentUserScore += 2;
          // console.log(currentUserScore);
        } else if (currentUserSelection === 'question-2-C') {
          currentUserScore += 3;
          // console.log(currentUserScore);
        } else if (currentUserSelection === 'question-2-D') {
          currentUserScore += 4;
          // console.log(currentUserScore);
        } else if (currentUserSelection === 'question-3-A') {
          currentUserScore += 1;
          // console.log(currentUserScore);
        } else if (currentUserSelection === 'question-3-B') {
          currentUserScore += 2;
          // console.log(currentUserScore);
        } else if (currentUserSelection === 'question-3-C') {
          currentUserScore += 3;
          // console.log(currentUserScore);
        } else if (currentUserSelection === 'question-3-D') {
          currentUserScore += 4;
          // console.log(currentUserScore);
        } else if (currentUserSelection === 'question-4-A') {
          currentUserScore += 1;
          // console.log(currentUserScore);
        } else if (currentUserSelection === 'question-4-B') {
          currentUserScore += 2.5;
          // console.log(currentUserScore);
        } else if (currentUserSelection === 'question-4-C') {
          currentUserScore += 4;
          // console.log(currentUserScore);
        } else if (currentUserSelection === 'question-5-A') {
          currentUserScore += 1;
          // console.log(currentUserScore);
        } else if (currentUserSelection === 'question-5-B') {
          currentUserScore += 2.5;
          // console.log(currentUserScore);
        } else if (currentUserSelection === 'question-5-C') {
          currentUserScore += 4;
          // console.log(currentUserScore);
        }

      } else if (a[i].actor.name === currentUserName) {
        currentUserSelection = a[i].result.response;
        // console.log(currentUserSelection);

        if (currentUserSelection === 'question-1-A') {
          currentUserScore += 1;
          // console.log(currentUserScore);
        } else if (currentUserSelection === 'question-1-B') {
          currentUserScore += 2.5;
          // console.log(currentUserScore);
        } else if (currentUserSelection === 'question-1-C') {
          currentUserScore += 4;
          // console.log(currentUserScore);
        } else if (currentUserSelection === 'question-2-A') {
          currentUserScore += 1;
          // console.log(currentUserScore);
        } else if (currentUserSelection === 'question-2-B') {
          currentUserScore += 2;
          // console.log(currentUserScore);
        } else if (currentUserSelection === 'question-2-C') {
          currentUserScore += 3;
          // console.log(currentUserScore);
        } else if (currentUserSelection === 'question-2-D') {
          currentUserScore += 4;
          // console.log(currentUserScore);
        } else if (currentUserSelection === 'question-3-A') {
          currentUserScore += 1;
          // console.log(currentUserScore);
        } else if (currentUserSelection === 'question-3-B') {
          currentUserScore += 2;
          // console.log(currentUserScore);
        } else if (currentUserSelection === 'question-3-C') {
          currentUserScore += 3;
          // console.log(currentUserScore);
        } else if (currentUserSelection === 'question-3-D') {
          currentUserScore += 4;
          // console.log(currentUserScore);
        } else if (currentUserSelection === 'question-4-A') {
          currentUserScore += 1;
          // console.log(currentUserScore);
        } else if (currentUserSelection === 'question-4-B') {
          currentUserScore += 2.5;
          // console.log(currentUserScore);
        } else if (currentUserSelection === 'question-4-C') {
          currentUserScore += 4;
          // console.log(currentUserScore);
        } else if (currentUserSelection === 'question-5-A') {
          currentUserScore += 1;
          // console.log(currentUserScore);
        } else if (currentUserSelection === 'question-5-B') {
          currentUserScore += 2.5;
          // console.log(currentUserScore);
        } else if (currentUserSelection === 'question-5-C') {
          currentUserScore += 4;
          // console.log(currentUserScore);
        }
      
      
      
      }
      // console.log(userGroup);
    }




  } 

  getTheUsersScore(qStatements);
}

window.addEventListener('load', determineTop10Scores);