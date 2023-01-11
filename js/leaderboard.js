

/* DEFINE THE ENDPOINT - LRS */ 
var conf = {
  "endpoint" : "https://xapi-practica.lrs.io/xapi/",
  "auth" : "Basic " + toBase64('nombre:clave')
};

ADL.XAPIWrapper.changeConfig(conf);


/* GLOBAL VARIABLES */ 
let qData = [];

let currentUserName = '';
let userChoice;


let organizedUserResultData = [];
let validScores = [];


/* GET RESPONSE DATA */ 
async function get_statements() {

  const quizParams1 = ADL.XAPIWrapper.searchParams();

  quizParams1['answered'] = "http://adlnet.gov/expapi/verbs/answered";

  const qQueryData = await ADL.XAPIWrapper.getStatements(quizParams1);
  // console.log(qQueryData);

  qData = await qQueryData.statements;

  // console.log(qData);



  qData.forEach(statement => {

    let userResults = [];
    let userScore = 0;

    if (statement.actor.name !== currentUserName) {
      currentUserName = statement.actor.name;
      let currentUserData = qData.filter(statement => statement.actor.name === currentUserName);

      for (let i = 0; i < currentUserData.length; i++) {
        userResults.push(currentUserData[i].result);
      }

      userResults.forEach(userResults => {

        if (userResults.response === 'question-5-C') {
          userScore += 4;
        } else if (userResults.response === 'question-5-B') {
          userScore += 2.5;
        } else if (userResults.response === 'question-5-A') {
          userScore += 1;
        } 
        
          else if (userResults.response === 'question-4-C') {
          userScore += 4;
        } else if (userResults.response === 'question-4-B') {
          userScore += 2.5;
        } else if (userResults.response === 'question-4-A') {
          userScore += 1;
        } 
        
          else if (userResults.response === 'question-3-D') {
          userScore += 4;
        } else if (userResults.response === 'question-3-C') {
          userScore += 1;
        } else if (userResults.response === 'question-3-B') {
          userScore += 2;
        } else if (userResults.response === 'question-4-A') {
          userScore += 3;
        }

          else if (userResults.response === 'question-2-D') {
          userScore += 4;
        } else if (userResults.response === 'question-2-C') {
          userScore += 2;
        } else if (userResults.response === 'question-2-B') {
          userScore += 3;
        } else if (userResults.response === 'question-2-A') {
          userScore += 1;
        }

          else if (userResults.response === 'question-1-C') {
          userScore += 4;
        } else if (userResults.response === 'question-1-B') {
          userScore += 2.5;
        } else if (userResults.response === 'question-1-A') {
          userScore += 1;
        }
      })

      let newUser = {
        userName: currentUserName,
        results: userResults,
        score: userScore
      }
      
      organizedUserResultData.push(newUser);

      // console.log(newUser);
    } 

  })

  organizedUserResultData.sort((a, b) => {
    if (a.score < b.score) {
      return 1;
    } else {
      return -1;
    }
  }) 

  // console.log(organizedUserResultData);


  for (let i = 0; i < organizedUserResultData.length; i++) {
    if (organizedUserResultData[i].score < 20) {
      validScores.push(organizedUserResultData[i])
    }
  }

  console.log(validScores);

  let topTenScores = validScores.map(x => x.score);
  let topTenUsers = validScores.map(x => x.userName);

  


  console.log(topTenScores);
  console.log(topTenUsers);


  const data = {
    labels: topTenUsers,
    datasets: [{
      backgroundColor: '#007172',
      borderColor: 'rgb(255, 99, 132)',
      data: topTenScores,
    }]
  };

  // leaderboardChart.defaults.global.defaultFontFamily = "'Poppins', sans-serif";

  const leaderboardCanvas = await document.getElementById('leaderboard-top-ten').getContext('2d');
  const leaderboardChart = await new Chart(leaderboardCanvas, {
    type: 'bar',
    data: data,
    options: {
      indexAxis: 'y',
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          ticks: {
            color: 'black',
            font: {
              family: "'Poppins', sans-serif",
              size: 15
            }
          },
          beginAtZero: false
        }
      },
    }
  });



  for (let i = 0; i < 10; i++) {
    const topTenList = document.getElementById('top-ten-list');
    const firstName = validScores[i].userName;
    const score = validScores[i].score;
    const entry = document.createElement('li');
    entry.appendChild(document.createTextNode(`${firstName}: ${score}/20`));
    topTenList.appendChild(entry);
  } 

}



/* Event listener to retrieve statements from the LRS */
window.addEventListener('load', get_statements);


